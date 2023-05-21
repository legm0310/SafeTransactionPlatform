const secure = (req, res, next) => {
  if (
    req.url.includes("/.git") ||
    req.url.includes("/.env") ||
    req.url.includes("/Core/Skin") ||
    req.url.includes("/GetCmd.aspx") ||
    req.url.includes("/_profiler/phpinfo")
  ) {
    return res.status(403).send("Forbidden");
  }
  next();
};

module.exports = secure;
