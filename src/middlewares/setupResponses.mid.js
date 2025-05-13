const setupResponses = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const messages = {
      200: "Success",
      201: "Created",
      400: "Client Error",
      401: "Bad auth",
      403: "Forbidden",
      404: "Not found",
      500: "Server Error",
    };
    const successResponse = (code, response, message = messages[code]) =>
      res.status(code).json({ method, url, response, message });
    const errorResponse = (code, errorMessage = messages[code]) => {
      const error = new Error(errorMessage);
      error.statusCode = code;
      throw error;
    };
    res.json200 = (response, message) =>
      successResponse(200, response, message);
    res.json201 = (response, message) =>
      successResponse(201, response, message);
    res.json400 = (message) => errorResponse(400, message);
    res.json401 = (message) => errorResponse(401, message);
    res.json403 = (message) => errorResponse(403, message);
    res.json404 = (message) => errorResponse(404, message);
    res.json500 = (message) => errorResponse(500, message);
    next();
  } catch (error) {
    next(error);
  }
};

export default setupResponses;
