const { signJWT, verifyJWT } = require("../utils/jwt");
const { User, RefreshToken } = require("../models");
const { getSession } = require("../sessions");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const deserializeUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }
  // const { payload, expired } = verifyJWT(accessToken);

  try {
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = decoded;

    return next();
  } catch (error) {
    if (!refreshToken) {
      return next();
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);

      const uuid = decoded.uuid;
      const user = await User.findOne({
        where: {
          uuid,
        },
        include: [{ model: RefreshToken, as: "refreshTokens" }],
      });

      if (!user) {
        throw new AppError(`user not found`, 404);
      }
      console.log("exla aq");
      const compare = user.refreshTokens.some(
        (token) => token.refreshToken == refreshToken,
      );
      if (compare) {
        const newAccessToken = signJWT(
          {
            email: user.email,
            name: user.name,
            uuid: user.uuid,
          },
          "20s",
        );
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
        });
        req.user = verifyJWT(newAccessToken).payload;

        return next();
      } else {
        return next();
      }
    } catch (err) {
      console.log(err);
      return next();
    }
  }

  // console.log(decoded);
  // // for a valid access token
  // if (payload) {
  //   req.user = payload;
  //   return next();
  // }

  // // expired but valid access token
  // const { payload: refresh } =
  //   expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };
  // console.log(refresh);
  // if (!refresh) {
  //   return next();
  // }

  // const session = getSession(refresh.sessionId);

  // if (!session) {
  //   return next();
  // }
  // const newAccessToken = signJWT(session, "10s");
  // res.cookie("accessToken", newAccessToken, {
  //   // maxAge: 30000,
  //   httpOnly: true,
  // });
  // req.user = verifyJWT(newAccessToken).payload;
};

module.exports = deserializeUser;
