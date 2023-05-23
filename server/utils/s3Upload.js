const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config");

aws.config.update(config.awsS3Config);
const s3Instance = new aws.S3();

const productS3Config = multerS3({
  s3: s3Instance,
  bucket: config.awsS3BucketName,
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `products/${file.originalname}`);
  },
});

const uploadProductImg = multer({
  storage: productS3Config,
});

const deleteProductImg = async (fileuri) => {
  const fileKey = fileuri.split("/").slice(-2).join("/");
  return await s3Instance
    .deleteObject({
      Bucket: config.awsS3BucketName,
      Key: fileKey,
    })
    .promise();
};

module.exports = { uploadProductImg, deleteProductImg };
