const { PrismaClient } = require("@prisma/client");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadImageToS3(filePath, fileName) {
  const fileContent = fs.readFileSync(filePath);

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: "image/png", // ou 'image/jpeg' dependendo do tipo de imagem
  };

  const upload = new Upload({
    client: s3Client,
    params: uploadParams,
  });

  const data = await upload.done();
  return data.Location;
}

async function main() {
  const imageDir = path.resolve(__dirname, "images");
  const imageFiles = fs.readdirSync(imageDir);

  for (const imageFile of imageFiles) {
    const filePath = path.join(imageDir, imageFile);
    const fileName = path.basename(imageFile);

    try {
      const productImageUrl = await uploadImageToS3(filePath, fileName);

      // Update the product in the database
      await prisma.product.update({
        where: { id: parseInt(fileName.split(".")[0]) }, // Assuming the file name is the product ID
        data: { productImageUrl },
      });

      console.log(`Uploaded ${fileName} to ${productImageUrl}`);
    } catch (error) {
      console.error(`Failed to upload ${fileName}:`, error);
    }
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
