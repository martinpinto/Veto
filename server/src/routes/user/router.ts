import * as express from 'express';
import { jwtHelper } from '../../shared/services/jwt-helper';
import { controller } from './user.controller';
import * as jwt from 'express-jwt';

const { Config } = require('../../config/index');
let config = Config();
const router = express.Router();

// router.use(jwtHelper);
// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
// let authCheck = jwt({
//     secret: new Buffer(config.oauth.secret, 'base64'),
//     audience: config.oauth.client
// });


// router.get('/', authCheck, controller.getAllAction);
router.get('/:id', controller.getOneAction);
router.post('/', controller.createAction);
router.put('/:id', controller.updateAction);
router.delete('/:id', controller.deleteAction);

export { router };