import express, { json } from "express";
import "express-async-errors"

import router from "./routers";
import { handlerError } from "./middlewares/errorsMiddleware";
import { removeExpiredTokens } from "./repositories/userRepository";

const app = express();
app.use(json())

app.use(router);
app.use(handlerError as express.ErrorRequestHandler);

setInterval(removeExpiredTokens, 1000)

export default app;