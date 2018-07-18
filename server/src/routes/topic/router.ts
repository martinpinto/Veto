import * as express from 'express';
import { jwtService } from '../../shared/services/jwt.service';
import { controller } from './topic.controller';

const router = express.Router();

router.get('/', controller.getAllAction);
router.get('/:id', controller.getOneAction);
router.post('/', jwtService, controller.createAction);
router.put('/:id', jwtService, controller.updateAction);
router.delete('/:id', jwtService, controller.deleteAction);

export { router };