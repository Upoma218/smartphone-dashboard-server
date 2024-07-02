import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import jwt, {
  JwtPayload,
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from 'jsonwebtoken';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Checking user authorization by token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
        errorMessage:
          'You do not have the necessary permissions to access this resource.',
        errorDetails: null,
        stack: null,
      });
    }

    try {
      // Checking if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized Access',
          errorMessage:
            'You do not have the necessary permissions to access this resource.',
          errorDetails: null,
          stack: null,
        });
      }
      const { role, userId } = decoded;

      // Checking the user's existence
      const user = await User.isUserExists(userId);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized Access',
          errorMessage:
            'You do not have the necessary permissions to access this resource.',
          errorDetails: null,
          stack: null,
        });
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized!',
        );
      }


      req.user = decoded as JwtPayload & { role: string };

      next();
    } catch (error) {
      // Handle specific JWT-related errors and customize the response
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized Access',
          errorMessage:
            'You do not have the necessary permissions to access this resource.',
          errorDetails: null,
          stack: null,
        });
      }

      if (error instanceof TokenExpiredError) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized Access',
          errorMessage:
            'You do not have the necessary permissions to access this resource.',
          errorDetails: null,
          stack: null,
        });
      }

      if (error instanceof NotBeforeError) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized Access',
          errorMessage:
            'You do not have the necessary permissions to access this resource.',
          errorDetails: null,
          stack: null,
        });
      }

      // For any other errors, return a generic unauthorized response
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Access',
        errorMessage:
          'You do not have the necessary permissions to access this resource.',
        errorDetails: null,
        stack: null,
      });
    }
  });
};

export default auth;
