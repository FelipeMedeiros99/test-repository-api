import express, { json } from "express";
import "express-async-errors"

import router from "./routers";
import { handlerError } from "./controllers/errorsMiddleware";

const app = express();
app.use(json())

app.use(router);
app.use(handlerError);

export default app;