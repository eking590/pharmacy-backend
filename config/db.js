import mongoose from "mongoose";
import { MONGO_URL } from "./Mongo_URL.js";

export const Mongoose = mongoose.connect(MONGO_URL, {  })
.then(() => console.log('Connected to MongoDatabase...'))
.catch(err => console.error('Could not connect to Mongo Database...'))


