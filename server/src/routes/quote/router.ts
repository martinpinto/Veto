import * as express from 'express';
import { jwtService } from '../../shared/services/jwt.service';
import { controller } from './quote.controller';

const router = express.Router();

router.get('/', controller.getAllAction);
router.get('/:id', controller.getOneAction);
//router.get('/weekly', controller.getWeeklyAction);
// router.get('/filter', this.getFilteredAction);
router.post('/', jwtService, controller.createAction);
router.put('/:id/vote', jwtService, controller.upOrDownVoteQuoteAction);            
router.post('/:id/favorite', jwtService, controller.createQuoteUserFavoriteAction);
router.delete('/:id', jwtService, controller.deleteAction);

export { router };