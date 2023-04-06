import express from "express";

import { getCertificate } from "./controllers/getCertificate.js";

const app = express();

app.get("/getCertificate", getCertificate);

app.listen(5000, () => console.log("Server is running on port 5000"));
