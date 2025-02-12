import express from "express";
import cors from "cors";
import http from "http";

//---------------NV MODULE---------------
import NV01Controller from "./screens/nv/nv01/NV01Controller.js";
import NV02Controller from "./screens/nv/nv02/NV02Controller.js";
import NV03Controller from "./screens/nv/nv03/NV03Controller.js";

//---------------CC MODULE---------------
import CC01Controller from "./screens/cc/cc01/CC01Controller.js";

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

//---------------NV MODULE---------------
app.use("/api/heng-xin/nv/nv01", NV01Controller);
app.use("/api/heng-xin/nv/nv02", NV02Controller);
app.use("/api/heng-xin/nv/nv03", NV03Controller);

//---------------CC MODULE---------------
app.use("/api/heng-xin/cc/cc01", CC01Controller);

server.listen(9999, () => {
  console.log(`Express is already`);
});
