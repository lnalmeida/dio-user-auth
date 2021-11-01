import { Router, Request, Response, NextFunction } from 'express';
import httpStatusCode from './consts/HttpStatusCode';

const routes = Router();

routes.get("/status", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatusCode.OK).send({ message: "Application Test OK!!!" });
});

routes.get("/users", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatusCode.OK).send({ message: `All Users Here` });
});

routes.get("/users/:id", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatusCode.OK).send({ message: `User ID:${req.params.id} is Show` });
});

routes.post("/users", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatusCode.CREATED).send({ message: `User  POST here` });
});

routes.put("/users/:id", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatusCode.OK).send({ message: `User ID:${req.params.id} is Updated` });
});

routes.delete("/users/:id", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatusCode.OK).send({ message: `User ID:${req.params.id} is Deleted` });
});

export default routes;