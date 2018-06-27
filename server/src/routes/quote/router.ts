import * as express from 'express';
import { jwtHelper } from '../../shared/services/jwt-helper';
import { controller } from './quote.controller';

const router = express.Router();

// router.use(jwtHelper);
router.get('/', controller.getAllAction);
router.get('/:id', controller.getOneAction);
// router.get('/filter', this.getFilteredAction);
router.post('/', controller.createAction);
// router.post('/voting', this.postNewVote);            
router.put('/:id', controller.updateAction);
router.delete('/:id', controller.deleteAction);

export { router };