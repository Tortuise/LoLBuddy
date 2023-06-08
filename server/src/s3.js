const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client;
const BUCKET = process.env.BUCKET;

export const uploadToS3 = async ({file, username}) => {
    const key = `${username}`
    const command = new PutObjectCommand({
        BUCKET:BUCKET,
        Key: key,
        Body:file.buffer,
        ContentType: file.mimetype,
    });
    try {
        s3.send(command)
        return {key}
    } catch (error) {
        console.log(error);
        return {error}
    }

}