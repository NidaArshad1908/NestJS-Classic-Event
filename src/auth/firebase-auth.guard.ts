import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import admin from '../firebase/firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext: {
      req?: { headers?: Record<string, unknown>; user?: any };
      user?: any;
      [key: string]: any;
    } = ctx.getContext();
    const req: { headers?: Record<string, unknown>; user?: any } =
      gqlContext.req || gqlContext;

    let authHeader = '';
    if (
      req &&
      req.headers &&
      typeof req.headers['authorization'] === 'string'
    ) {
      authHeader = req.headers['authorization'];
    }
    const token: string | null = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;
    if (!token) {
      throw new UnauthorizedException('No authorization token');
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      (req as { user?: any }).user = decodedToken;
      gqlContext.user = decodedToken;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
