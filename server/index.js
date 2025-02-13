import express from "express";
import cors from "cors";
import http from "http";

//---------------NV MODULE---------------
import NV01Controller from "./screens/nv/nv01/NV01Controller.js";
import NV02Controller from "./screens/nv/nv02/NV02Controller.js";

//---------------CC MODULE---------------
import CC01Controller from "./screens/cc/cc01/CC01Controller.js";
import CC02Controller from "./screens/cc/cc02/CC02Controller.js";

//---------------MA MODULE---------------
import MA01Controller from "./screens/ma/ma01/MA01Controller.js";

const app = express();
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors());

const server = http.createServer(app);

//---------------NV MODULE---------------
app.use("/api/quocpq/nv/nv01", NV01Controller);
app.use("/api/quocpq/nv/nv02", NV02Controller);

//---------------CC MODULE---------------
app.use("/api/quocpq/cc/cc01", CC01Controller);
app.use("/api/quocpq/cc/cc02", CC02Controller);

//---------------MA MODULE---------------
app.use("/api/quocpq/ma/ma01", MA01Controller);

server.listen(9999, () => {
  console.log(`Express server is running on port 9999`);
});
