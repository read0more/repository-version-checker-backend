import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';

export default (): JwtFromRequestFunction => {
  return (request: Request) => {
    let token = null;

    if (request?.cookies) {
      token = request.cookies['Authorization'];
    }

    return token;
  };
};
