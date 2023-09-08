const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");

const EncryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.CRYPTO_SALT).toString();
};

const PasswordHash = async (password) => {
  return await bcrypt.hash(password, Number(process.env.CRYPTO_SALT) || 10);
};
const MatchPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
module.exports = { EncryptData, MatchPassword, PasswordHash };
