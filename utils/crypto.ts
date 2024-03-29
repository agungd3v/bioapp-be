import CryptoJS from "crypto-js";
import jwToken from "jsonwebtoken";
import moment from "moment";

const secret = process.env.SECRET_KEY || "";

export const encrypt = (text: string) => {
  const cipherText = CryptoJS.AES.encrypt(text, secret);
  return cipherText.toString();
}

export const decrypt = (ecryptedText: string) => {
  const bytes = CryptoJS.AES.decrypt(ecryptedText, secret);
  const text = bytes.toString(CryptoJS.enc.Utf8);
  return text;
}

export const sign = (userKey: any) => {
  const expired = moment().endOf("day").diff(moment(), "s");
  const sign = jwToken.sign(userKey, secret, {expiresIn: expired});
  return {signature: sign, expired: expired};
}

export const verify = (tokenString: string) => {
  const verify = jwToken.verify(tokenString, secret);
  return verify;
}