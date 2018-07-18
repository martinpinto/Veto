import * as express from 'express';
import { logger } from '../../shared/services/logger.service';

import User from './user.model';
import UserService from './user.service';

export const controller = {
  async getAllAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<User[]> {
    // check if user equals administrator
    let users = [
        { id: 1, name: 'Todd Motto', image: 'image-1.jpg' },
        { id: 2, name: 'Brad Green', image: 'image-2.jpg' },
        { id: 3, name: 'Igor Minar', image: 'image-3.jpg' }
    ];

    res.json(users);    
    return null;
  },
  async getOneAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<User> {
    if (req.params && req.params.id) {
        let id: number = req.params.id;

        let user = await UserService.getUser(id);
        res.status(200).json(user);
        return user;
    }
    return null;  },
  async createAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<User> {
    return null;
  },
  async updateAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<User> {
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
