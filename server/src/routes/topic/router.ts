import * as express from 'express';
import { jwtService } from '../../shared/services/jwt.service';
import { controller } from './topic.controller';

const router = express.Router();

router.use(jwtService);

router.get('/', controller.getAllAction);
router.get('/:id', controller.getOneAction);
router.post('/', controller.createAction);
router.put('/:id', controller.updateAction);
router.delete('/:id', controller.deleteAction);

export { router };