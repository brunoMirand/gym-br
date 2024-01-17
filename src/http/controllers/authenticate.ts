import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';
import { InvalidCredentialsError } from '@/use-cases/errors';

export class AuthenticateController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      const input = authenticateBodySchema.parse(request.body);
      const authenticate = makeAuthenticateUseCase();
      await authenticate.execute(input);

      return reply.status(200).send();
    } catch (e) {
      if (e instanceof InvalidCredentialsError) {
        return reply.status(401).send({ message: e.message });
      }
      throw e;
    }
  }
}