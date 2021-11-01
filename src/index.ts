import express, { NextFunction, Request, Response } from "express";

import HttpStatusCode from "./consts/HttpStatusCode";


const app: any = express();
const port: number = process.env.PORT | 3126;

app.get("/status", (req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatusCode.OK).send({ message: "Application Online!!!" });
});

app.listen(port, () => {
  console.log(" App listening on port 3126");
});

export default app;
