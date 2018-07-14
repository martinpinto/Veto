import * as express from 'express';
import { jwtService } from '../../shared/services/jwt.service';
import { controller } from './quote.controller';

const router = express.Router();

router.use(jwtService);

router.get('/', controller.getAllAction);
router.get('/:id', controller.getOneAction);
//router.get('/weekly', controller.getWeeklyAction);
// router.get('/filter', this.getFilteredAction);
router.post('/', controller.createAction);
router.put('/:id/vote', controller.upOrDownVoteQuoteAction);            
router.post('/:id/favorite', controller.createQuoteUserFavoriteAction);
router.delete('/:id', controller.deleteAction);

export { router };