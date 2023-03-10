import express from "express";
import cors from "cors";
import { loadEnv } from "./config/env";
import { messageRouter, signRouter, usersRouter } from "./routers";

loadEnv();

const server = express();

server
	.use(express.json())
	.use(cors())
	.get("/status", (req, res) => res.send("It's alive!!!"))
	.use(usersRouter)
	.use(signRouter)
	.use(messageRouter);

export default server;
