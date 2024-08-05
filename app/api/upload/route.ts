import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req: Request) {
  const formData = await req.formData();

  if (formData.has("file")) {
    const file = formData.get("file") as File;

    if (
      !process.env.S3_ACCESS_KEY ||
      !process.env.S3_SECRET_ACCESS_KEY ||
      !process.env.BUCKET_NAME
    ) {
      return new Response("Missing environment variables", { status: 500 });
    }

    const s3Client = new S3Client({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const randomId = uniqid();
    const ext = file.name.split(".").pop();
    const newFilename = randomId + "." + ext;
    const bucketName = process.env.BUCKET_NAME;

    // Convert ReadableStream to Buffer
    const buffer = await new Response(file).arrayBuffer();
    const body = Buffer.from(buffer);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        ACL: "public-read",
        Body: body,
        ContentType: file.type,
      })
    );

    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

    return new Response(JSON.stringify({ link }), { status: 200 });
  }

  return new Response("File not found", { status: 400 });
}
