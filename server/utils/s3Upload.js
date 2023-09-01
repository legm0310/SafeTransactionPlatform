const { S3Client, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config");

const s3Client = new S3Client(config.awsS3Config);

const uploadProdS3Config = multerS3({
  s3: s3Client,
  bucket: config.awsS3BucketName,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    console.log(file);
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `product/${Date.now()}_${file.originalname}`);
  },
});

const uploadProductImg = multer({
  storage: uploadProdS3Config,
});

const deleteProductImg = async (fileuri) => {
  const command = new DeleteObjectsCommand({
    Bucket: config.awsS3BucketName,
    Delete: {
      Objects: fileuri.map((uri) => ({
        Key: decodeURIComponent(uri.split("/").slice(-2).join("/")),
      })),
    },
  });
  const { Deleted } = await s3Client.send(command);
  return Deleted;
};

const getImgUrlByKey = (fileKey) => {
  return `https://${config.awsS3BucketName}.s3.${config.awsS3Config.region}.amazonaws.com/${fileKey}`;
};

module.exports = { uploadProductImg, deleteProductImg, getImgUrlByKey };
