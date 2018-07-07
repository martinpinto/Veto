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

        let topics = await TopicsService.getTopics();
        res.status(200).json(topics);
        return topics;
    },
    async getOneAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<Topic> {
        res.header('Access-Control-Allow-Origin', '*');
        if (req.params && req.params.id) {
            let id = req.params.id;

            let topic = await TopicsService.getTopic(id);
            res.status(200).json(topic);
            return topic;
        }

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
