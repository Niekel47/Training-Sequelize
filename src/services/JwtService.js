import jwt from "jsonwebtoken";

const generateToken = async (payload, secretKey, expiresIn) => {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

const genneralAccessToken = async (payload) => {
  return generateToken(payload, process.env.ACCESS_TOKEN, "30s");
};

const genneralRefreshToken = async (payload) => {
  return generateToken(payload, process.env.REFRESH_TOKEN, "1m");
};

export { genneralAccessToken, genneralRefreshToken };
