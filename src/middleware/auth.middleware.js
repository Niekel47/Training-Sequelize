import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_expiresIn }
  );
  return access_token;
};

export const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_expiresIn }
  );
  return refresh_token;
};

export const AccessTokenGuard = (permissions = []) => {
  return async (req, res, next) => {
    try {
      if (!req.auth) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Check permission
      if (permissions) {
        const permissionData = req.auth.permissions || [];
        const access = permissions.every((p) => {
          return permissionData.includes(p);
        });
        if (!access) {
          return res.status(403).json({ error: "You can not access this API" });
        }
      }
      next();
    } catch (e) {
      next(e);
    }
  };
};


// const refreshTokenJwtService = (token) => {
//   return new Promise((resolve, reject) => {
//     try {
//       verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
//         if (err) {
//           resolve({
//             status: "ERR",
//             message: "The authemtication",
//           });
//         }
//         const access_token = await genneralAccessToken({
//           id: user?.id,
//           isAdmin: user?.isAdmin,
//         });
//         resolve({
//           status: "OK",
//           message: "SUCCESS",
//           access_token,
//         });
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
