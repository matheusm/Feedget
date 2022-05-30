import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit Feedback', () => { 
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment sample',
      screenshot: 'data:image/png;base64,dad'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  })

  it('should be not able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'comment sample',
      screenshot: 'data:image/png;base64,dad'
    })).rejects.toThrow();
  })

  it('should be not able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'test',
      comment: '',
      screenshot: 'data:image/png;base64,dad'
    })).rejects.toThrow();
  })

  it('should be not able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'test',
      comment: 'comment',
      screenshot: '123'
    })).rejects.toThrow();
  })

  
})