const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadPdfToS3(filePath, fileName) {
  const fileContent = fs.readFileSync(filePath);

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: "application/pdf",
  };

  const upload = new Upload({
    client: s3Client,
    params: uploadParams,
  });

  const data = await upload.done();
  return data.Location;
}

async function main() {
  const pdfDir = path.resolve(__dirname, "pdfs");
  const pdfFiles = fs.readdirSync(pdfDir);

  for (const pdfFile of pdfFiles) {
    const filePath = path.join(pdfDir, pdfFile);
    const fileName = path.basename(pdfFile);

    try {
      const leafletUrl = await uploadPdfToS3(filePath, fileName);

      // Update the product in the database
      await prisma.product.update({
        where: { id: parseInt(fileName.split(".")[0]) }, // Assuming the file name is the product ID
        data: { leafletUrl: fileName },
      });

      console.log(`Uploaded ${fileName} to ${leafletUrl}`);
    } catch (error) {
      console.error(`Failed to upload ${fileName}:`, error);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
