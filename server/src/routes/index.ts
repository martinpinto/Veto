import { router as quoteRouter } from "./quote/router";
import { router as topicRouter } from "./topic/router";
import { router as userRouter } from "./user/router";

const express = require('express');
const Router = express.Router;
const router = Router();

router.use('/quote', quoteRouter);
router.use('/topic', topicRouter);
router.use('/user', userRouter);

export { router };