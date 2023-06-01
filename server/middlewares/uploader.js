const { uploadProdImg } = require("../utils");

const uploader = (req, res, next) => {
  // console.log(req.body.values());

  uploadProdImg.array("prodImg", 10)(req, res, (error) => {
    if (error) {
      return next(error);
    }
    console.log(req.body);
    return next();
  });
};

module.exports = uploader;
