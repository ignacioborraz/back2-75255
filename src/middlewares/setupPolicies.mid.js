import { verifyToken } from "../helpers/token.helper.js";

const setupPolicies = (policies) => async (req, res, next) => {
  try {
    if (policies.includes("PUBLIC")) return next();
    const token = req?.cookies?.token;
    const data = verifyToken(token);
    const { role, user_id } = data;
    if (!role || !user_id) return res.json401();
    const roles = {
      USER: policies.includes("USER"),
      ADMIN: policies.includes("ADMIN"),
    };
    if (roles[role]) {
      req.user = data;
      return next();
    } else {
      res.json403();
    }
  } catch (error) {
    next(error)
  }
};

export default setupPolicies;
