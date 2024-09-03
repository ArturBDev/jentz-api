const { PrismaClient } = require("@prisma/client");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function uploadPdfToS3(filePath, fileName) {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: "application/pdf",
  };

  const data = await s3.upload(params).promise();
  return data.Location;
}

async function main() {
  const pdfDir = path.resolve(__dirname, "pdfs");
  const pdfFiles = fs.readdirSync(pdfDir);

  for (const pdfFile of pdfFiles) {
    const filePath = path.join(pdfDir, pdfFile);
    const fileName = path.basename(pdfFile);

    try {
      const pdfUrl = await uploadPdfToS3(filePath, fileName);

      // Update the product in the database
      await prisma.product.update({
        where: { id: parseInt(fileName.split(".")[0]) }, // Assuming the file name is the product ID
        data: { pdfUrl },
      });

      console.log(`Uploaded ${fileName} to ${pdfUrl}`);
    } catch (error) {
      console.error(`Failed to upload ${fileName}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
