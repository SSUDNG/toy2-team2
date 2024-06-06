import { z } from 'zod';

const schema = z.object({
  reason: z.string(),
  pay: z.number({
    message: '유효한 숫자가 아닙니다.',
  }),
  irregular: z.number({
    message: '유효한 숫자가 아닙니다.',
  }),
});

export default schema;
