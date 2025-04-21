import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { usersManager } from "../data/managers/mongo/manager.mongo.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

passport.use(
  /* nombre de la estrategia de autenticacion/autorizacion */
  "register",
  /* estrategia de autenticación/autorizacion */
  new LocalStrategy(
    /* objeto de configuración de la estrategia */
    {
      passReqToCallback: true,
      usernameField: "email" /* , passwordField: "pass" */,
    },
    /* callback con la lógica necesaria para resolver la estrategia */
    async (req, email, password, done) => {
      try {
        if (!req.body.city) {
          const error = new Error("Invalid data");
          error.statusCode = 400;
          throw error;
        }
        let user = await usersManager.readBy({ email });
        if (user) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        req.body.password = createHash(password);
        user = await usersManager.createOne(req.body);
        /* el primer parámetro de done es el error (si ocurre) */
        /* el segundo parámetro son los datos del usuario que se guardan en el objeto de req */
        /* es decir a partir de que se aplica este middleware: existe req.user */
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await usersManager.readBy({ email });
        if (!user) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        const verifyPass = compareHash(password, user.password);
        if (!verifyPass) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        /* no necesito sessions porque trabajaremos con token */
        //req.session.user_id = user._id;
        //req.session.email = user.email;
        //req.session.role = user.role;
        /* crear el token y enviarlo al cliente */
        const data = {
          user_id: user._id,
          email: user.email,
          role: user.role,
        };
        const token = createToken(data);
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "user",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        const { user_id, email, role } = data;
        const user = await usersManager.readBy({ _id: user_id, email, role });
        if (!user) {
          const error = new Error("Forbidden");
          error.statusCode = 403;
          throw error;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        const { user_id, email, role } = data;
        const user = await usersManager.readBy({ _id: user_id, email, role });
        if (!user || user.role !== "ADMIN") {
          const error = new Error("Forbidden");
          error.statusCode = 403;
          throw error;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
