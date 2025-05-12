import passport from "./passport.mid.js";

const passportCb = (strategy) => async (req, res, next) => {
  passport.authenticate(strategy, (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      const error = new Error(info.message || "Bad Auth");
      error.statusCode = info.statusCode || 401;
      return next(error);
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default passportCb;
