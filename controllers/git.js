exports.before = function(req,res, next) { 
  // var user = db.users[req.params.user_id];
  // if (!user) { return next(); }
  next();
};
exports.pull = function(req,res, next) {
  console.log(req.body);
}