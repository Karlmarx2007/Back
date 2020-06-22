import { IUser } from './models/user';
import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user: IUser) => {
  const secret = config.JWT_SECRET;
  return jwt.sign(user.toJSON(), secret, {
    expiresIn: '4h'
  });
};

const isAuth = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: 'token is not supplied' });
  
  //Getting rid of "Bearer"
  const onlyToken = token.slice(6, token.length);

  jwt.verify(onlyToken, config.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ msg: err.message });
    }
    req.user = decoded;
    
    /*
    Called if the current middleware function does not end the request-response cycle
    to pass control to the next middleware function, else the request will be left hanging.
    */
    return next();
  });
  
};

const isAdmin = (req: any, res: any, next: any) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({msg: 'Admin token is not valid'})
}

export { getToken, isAuth, isAdmin };