import { router as quoteRouter } from "./quote/router";
import { router as topicRouter } from "./topic/router";
import { router as userRouter } from "./user/router";

const express = require('express');
const Router = express.Router;
const router = Router();

router.get('/quote', quoteRouter);
router.get('/topic', topicRouter);
router.get('/user', userRouter);

export { router };