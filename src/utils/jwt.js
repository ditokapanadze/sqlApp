const jwt = require("jsonwebtoken");

const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
aslkASjasdasdadashdjasghdhasggcjzhcghagdfajdhbasdgasjkdlbbaassdas
sadasdasjldassdnasklndassndlkasndjasndasd
-----END RSA PRIVATE KEY-----
`;
const publicKey = `
-----BEGIN RSA PUBLIC KEY-----
aslkASjasdasdadashdjasghdhasggcjzhcghagdfajdhbasdgasjkdlbbaassdas
sadasdasjldassdnasklndassndlkasndjasndasdasdasdadsasd
-----END RSA PUBLIC KEY-----
`;
//sign jwt
const signJWT = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn,
  });
};

//verify jwt

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};

module.exports = {
  verifyJWT,
  signJWT,
};
