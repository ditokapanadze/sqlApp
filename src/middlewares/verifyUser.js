const { signJWT, verifyJWT } = require("../utils/jwt");
const { User, RefreshToken } = require("../models");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const verifyUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

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
      return next();
    }
  }
};

module.exports = verifyUser;
