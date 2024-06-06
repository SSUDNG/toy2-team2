import { z } from 'zod';

const MATCH_PAY = /^[1-9][0-9]*$/;
const MATCH_IRREGULAR = /^-?[1-9][0-9]*$/;
const NUMBER_ERROR_MESSAGE = '유효한 숫자가 아닙니다.';

const schema = z.object({
  reason: z.string(),
  pay: z
    .string({
      required_error: NUMBER_ERROR_MESSAGE,
    })
    .regex(MATCH_PAY, {
      message: NUMBER_ERROR_MESSAGE,
    }),
  irregular: z
    .string({
      required_error: NUMBER_ERROR_MESSAGE,
    })
    .regex(MATCH_IRREGULAR, {
      message: NUMBER_ERROR_MESSAGE,
    }),
});

export default schema;
