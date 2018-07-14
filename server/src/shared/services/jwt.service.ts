import * as express from 'express';
import * as expressJwt from 'express-jwt';
import { Config } from '../../config';

const config = Config();
console.log(config)
export const jwtService = expressJwt({
    secret: config.oauth.secret,
});
