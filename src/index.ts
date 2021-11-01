import express from "express";
import routes from "./routes";

const app: any = express();

app.use(routes);
app.use(express.json());


export default app;
