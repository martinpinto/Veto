import * as express from 'express';
import { jwtService } from '../../shared/services/jwt.service';
import { controller } from './user.controller';
import * as jwt from 'express-jwt';

const { Config } = require('../../config/index');
let config = Config();
const router = express.Router();

router.use(jwtService);

router.get('/', controller.getAllAction);
router.get('/:id', controller.getOneAction);
router.post('/', controller.createAction);
router.put('/:id', controller.updateAction);
router.delete('/:id', controller.deleteAction);

export { router };