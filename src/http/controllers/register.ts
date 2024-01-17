import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';
import { UserAlreadyExistsError } from '@/use-cases/errors';

export class RegisterController {
  constructor() { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      const input = registerBodySchema.parse(request.body);
      const register = makeRegisterUseCase();
      await register.execute(input);
      return reply.status(201).send();
    } catch (e) {
      if (e instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: e.message });
      }
      throw e;
    }
  }
}
