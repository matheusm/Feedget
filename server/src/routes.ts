import { Router } from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = Router();

routes.post("/feedbacks", async (req, res) => {
  const { comment, type, screenshot } = req.body;

  const nodemailerMailAdapter = new NodemailerMailAdapter()
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackuseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository, 
    nodemailerMailAdapter
  );

  await submitFeedbackuseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send()
});