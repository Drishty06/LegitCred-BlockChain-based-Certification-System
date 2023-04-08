import express from "express";

import { getJSONData } from "./controllers/getJSONData.js";

const app = express();

app.get("/getjsondata/:jsonCID", getJSONData);

app.listen(5000, () => console.log("Server is running on port 5000"));
