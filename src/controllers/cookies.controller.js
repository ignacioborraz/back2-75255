const createCb = (req, res, next) => {
  try {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    //const maxAge = 5 * 1000;
    const message = "Cookie vence en 7 dias";
    return res
      .status(201)
      .cookie("mode", "dark", { maxAge })
      .cookie("role", "admin", { maxAge })
      .json({ message });
  } catch (error) {
    next(error);
  }
};
const createSignedCb = (req, res, next) => {
  try {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    //const maxAge = 5 * 1000;
    const message = "Cookie vence en 7 dias";
    return res
      .status(201)
      .cookie("user", "igna", { maxAge, signed: true })
      .cookie("id", "123456789", { maxAge, signed: true })
      .json({ message });
  } catch (error) {
    next(error);
  }
};
const readCb = (req, res, next) => {
  try {
    const cookies = req.cookies;
    return res.status(200).json({ cookies });
  } catch (error) {
    next(error);
  }
};
const readSignedCb = (req, res, next) => {
  try {
    const cookies = req.signedCookies;
    return res.status(200).json({ cookies });
  } catch (error) {
    next(error);
  }
};
const clearCb = (req, res, next) => {
  try {
    const message = "Cookies eliminadas";
    return res
      .status(200)
      .clearCookie("user")
      .clearCookie("role")
      .json({ message });
  } catch (error) {
    next(error);
  }
};

export { createCb, createSignedCb, readCb, readSignedCb, clearCb };
