const { uploadProdImg } = require("../utils");

const uploader = (req, res, next) => {
  // console.log(123123123, err);
  // if (err) {
  //   console.log(2222, err);
  //   return next(err);
  // }
  // console.log(123);
  uploadProdImg.fields([{ name: "product", maxCount: 10 }])(
    req,
    res,
    (error) => {
      if (error) {
        return next(error);
      }
      return next();
    }
  );
};

module.exports = uploader;
