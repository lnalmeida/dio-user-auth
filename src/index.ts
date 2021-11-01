import express from "express";
import routes from "./routes/users.routes";

const app: any = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


export default app;
