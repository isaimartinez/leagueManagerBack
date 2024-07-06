import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import reportRoutes from './routes/report.routes.js'
// import zoneRoutes from './routes/zones.router.js'
// import userRoutes from './routes/users.js'

const app = express();
dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// app.use('/report', reportRoutes)
// app.use('/zones', zoneRoutes)
// app.use('/user', userRoutes)

const PORT =  process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((er) => console.log("error",er.message));

