import { Router } from "express";
import userRouter from "./userRouter";
import testRouter from "./testsRouter";

const router = Router();

router.use(userRouter);
router.use(testRouter);

export default router;