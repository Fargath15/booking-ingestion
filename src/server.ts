import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { ConnectionService } from "./db_connection";
import { ControllerFactory } from "./controllers/controller-factory.controller";

const app = express();
dotenv.config({ path: "./.env.dev" });

let connectionOptions = require("./../ormconfig.json");

let option;

if (process.env.ENV?.includes("dev")) {
  option = connectionOptions.find((x: any) => x.name === "default");
} else {
  option = connectionOptions.find((x: any) => x.name === process.env.ENV);
}

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

app.set("port", port);

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("Ping check success");
});

new ConnectionService().CreateConnection(option).then(() => {
  new ControllerFactory().getControllers().forEach((controller) => {
    app.use(controller.getRoutePath(), controller.getRouter());
  });
  app.listen(port, () => {
    console.log("Server is listening on port ", port);
    console.log("http://localhost:%d/ping", app.get("port"));
  });
});
