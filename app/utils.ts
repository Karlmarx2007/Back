import { IUser } from './models/user';
import jwt from 'jsonwebtoken';
import config from './config';
import { NextFunction } from 'express';

const getToken = (user: IUser) => {
  const secret = config.JWT_SECRET;
  return jwt.sign(user.toJSON(), secret, {
    expiresIn: '48h'
  })
};

const isAuth =  (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  console.log('req.headers > ', req.headers);
  
  if (token) {
    //Getting rid of "Bearer"
    const onlyToken = token.slice(6, token.length);
    
    jwt.verify(onlyToken, config.JWT_SECRET, (err: any, decode: any) => {
      if (err) {
        return res.status(401).send({ msg: 'invalid token', err });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: 'token is not supplied' });
  }
  
};

const isAdmin = (req: any, res: any, next: any) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({msg: 'Admin token is not valid'})
}

export { getToken, isAuth, isAdmin };