import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      payload,
    },
    "access_token",
    { expiresIn: "1h" }
  );
  return access_token;
};

const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      payload,
    },
    "refresh_token",
    { expiresIn: "365d" }
  );
  return refresh_token;
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
//         //trong video:
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

export {
  genneralAccessToken,
  genneralRefreshToken,
  //   refreshTokenJwtService,
};
