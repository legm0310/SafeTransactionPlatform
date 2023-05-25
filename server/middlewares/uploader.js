const { uploadProdImg } = require("../utils");

const uploader = (req, res, next) => {
  console.log(req.body);
  uploadProdImg.array("files", 10)(req, res, (error) => {
    if (error) {
      console.log(error);
    }
  });

  next();
};

module.exports = uploader;
