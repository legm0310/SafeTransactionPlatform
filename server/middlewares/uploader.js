const { uploadProdImg } = require("../utils");

const uploader = (req, res, next) => {
  uploadProdImg.array("prodImg", 10)(req, res, (error) => {
    if (error) {
      return next(error);
    }
    req.body = JSON.parse(req.body.data);
    req.body.seller_id = res.locals.userId;
    let imgArr = req.files.map((obj) => obj.location);
    req.body.images = imgArr.join(",");
    console.log(req.body);
    return next();
  });
};

module.exports = uploader;
