import DataStore from "nedb";
import path from "path";

const storage = path.dirname(__dirname) + "/storage/database.db";
const database = new DataStore({filename: storage, autoload: true, corruptAlertThreshold: 1});

export default database;
