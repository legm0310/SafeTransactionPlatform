const { uploadProdImg } = require("../utils");

const uploader = (req, res, next) => {
  uploadProdImg.fields([{ name: "product", maxCount: 10 }])(
    req,
    res,
    (error) => {
      if (error) {
        next(error);
      }
      next();
    }
  );
};

module.exports = uploader;
