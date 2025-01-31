export const getS3URL = ({
  fileName,
  folderPath,
}: {
  fileName: string;
  folderPath?: string;
}) => {
  const key = folderPath
    ? `${folderPath.replace(/^\/+|\/+$/g, "")}/${fileName}`
    : fileName;
  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${key}`;
};

export default getS3URL;
