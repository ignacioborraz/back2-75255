import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { usersManager } from "../data/managers/mongo/manager.mongo.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect";

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
          //const error = new Error("Invalid data");
          //error.statusCode = 400;
          //throw error;
          return done(null, null, { message: "Invalid data", statusCode: 400 });
        }
        let user = await usersManager.readBy({ email });
        if (user) {
          //const error = new Error("Invalid credentials");
          //error.statusCode = 401;
          //throw error;
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
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
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
        }
        const verifyPass = compareHash(password, user.password);
        if (!verifyPass) {
          return done(null, null, { message: "Invalid credentials", statusCode: 401 });
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
          return done(null, null, { message: "Forbidden", statusCode: 403 });
        }
        return done(null, user);
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
          return done(null, null, { message: "Forbidden", statusCode: 403 });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const { email, name, picture, id } = profile;
        let user = await usersManager.readBy({ email: id });
        if (!user) {
          user = {
            email: id,
            name: name.givenName,
            avatar: picture,
            password: createHash(email),
            city: "Google",
          };
          user = await usersManager.createOne(user);
        }
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

export default passport;
