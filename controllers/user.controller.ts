import { Request, Response } from "express";
import database from "../config/database";
import { findHoroscope } from "../utils/helpers";

type documentType = {
  photo: string;
  name: string;
  birthday: string;
  gender: string;
  interests: string[];
}

const UserController = {
  index: (req: Request, res: Response) => {
    const user = (global as any).user;

    database.findOne({_id: user._id}, (err, doc) => {
      if (doc) {
        delete doc.password;
        delete doc.userAgent;
        delete doc._id;
      }
      return res.status(doc ? 200 : 400).json({
        status: doc ? 200 : 400,
        message: "success",
        data: doc ? doc : null
      });
    });
  },
  update: (req: Request, res: Response) => {
    const user = (global as any).user;
    const requestData: documentType = req.body;
    
    database.findOne({_id: user._id}, (err, doc) => {
      const horoscope = {horoscope: findHoroscope(requestData.birthday)};

      if (doc) return database.update({_id: user._id}, { $set: {...doc, ...requestData, ...horoscope} }, {}, (err, numReplaced) => {
        delete doc.password;
        delete doc.userAgent;
        delete doc._id;

        database.loadDatabase();
        return res.status(200).json({status: 200, message: "success", data: {...doc, ...requestData, ...horoscope}});
      });

      return res.status(400).json({status: 400, message: err});
    });
  }
}

export default UserController;