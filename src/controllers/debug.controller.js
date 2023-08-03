const debug = (req, res, next) => {
  console.log(req.headers);
  console.log(req.body);
  next();
};

module.exports = { debug };
