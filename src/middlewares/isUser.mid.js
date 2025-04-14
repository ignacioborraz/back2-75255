const isUser = (req, res, next) => {
  try {
    if (req.session.user_id) {
      const { user_id, email, role } = req.session;
      req.user = { user_id, email, role };
      next();
    } else {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export default isUser;
