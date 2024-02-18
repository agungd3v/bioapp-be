import { Request, Response } from "express";
import { decrypt, encrypt, sign } from "../utils/crypto";
import database from "../config/database";

type documentType = {
  username: string;
  email: string;
  password: string;
}

type loginType = {
  user: string;
  password: string;
}

const AuthController = {
  register: async (req: Request, res: Response) => {
    const data: documentType = await req.body;
    // check username or email
    database.findOne({$or: [{email: data.email}, {username: data.username}]}, function(err, doc) {
      const document = {...data, password: encrypt(data.password)}

      if (doc) return res.status(400).json({status: 400, message: "username atau email sudah terdaftar"});

      database.insert(document, function(err, newDoc) {
        return res.status(err ? 400 : 200).json({
          status: err ? 400 : 200,
          message: err ? err : "register berhasil"
        });
      });
    });
  },
  login: async (req: Request, res: Response) => {
    const data: loginType = await req.body;
    // check username or email
    database.findOne({$or: [{email: data.user}, {username: data.user}]}, function(err, doc) {
      if (!doc) return res.status(400).json({status: 400, message: "username atau email tidak terdaftar"});

      if (decrypt(doc.password) === data.password) {
        const token = sign({_id: doc._id});

        delete doc._id;
        delete doc.password;
        delete doc.userAgent;

        return res.status(200).json({status: 200, message: "login berhasil", user: doc, token: token});
      }

      return res.status(400).json({status: 400, message: "user password salah"});
    });
  }
}

export default AuthController;