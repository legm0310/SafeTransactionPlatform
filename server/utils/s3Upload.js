const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config");

const s3Client = new S3Client(config.awsS3Config);

const productS3Config = multerS3({
  s3: s3Client,
  bucket: config.awsS3BucketName,
  acl: "public-read",
  // contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    console.log(file);
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `product/${Date.now()}_${file.originalname}`);
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
