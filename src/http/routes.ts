import { FastifyInstance } from 'fastify';
import { RegisterController } from '@/http/controllers/register';
import { AuthenticateController } from '@/http/controllers/authenticate';

export async function appRoute(app: FastifyInstance) {
  app.post('/users', (new RegisterController).handle);
  app.post('/sessions', (new AuthenticateController).handle);
}
