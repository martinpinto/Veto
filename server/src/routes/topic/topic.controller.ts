import * as express from 'express';
import { logger } from '../../shared/services/logger.service';

import Topic from './topic.model';
import TopicsService from './topic.service';

export const controller = {
  async getAllAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<Topic[]> {
    res.header('Access-Control-Allow-Origin', '*');
        
    return TopicsService.getTopics().then(topics => {
        res.status(200).json(topics);
        return topics;
    });
  },
  async getOneAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<Topic> {
    return null;
  },
  async createAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<Topic> {
    return null;
  },
  async updateAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<Topic> {
    return null;
  },
  async deleteAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<boolean> {
    return true;
  },
};
