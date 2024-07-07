import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import swaggerDocs from "./swagger.js";
import leagueRoutes from "./src/routes/league.router.js";
import matchRoutes from "./src/routes/match.router.js";
import playerRoutes from "./src/routes/player.router.js";
import teamRoutes from "./src/routes/team.router.js";
import userRoutes from "./src/routes/user.router.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

swaggerDocs(app);

app.use("/api/auth", userRoutes);
app.use("/api", leagueRoutes);
app.use("/api", matchRoutes);
app.use("/api", playerRoutes);
app.use("/api", teamRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((er) => console.log("error", er.message));
