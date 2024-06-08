import { z } from 'zod';

const REASON_MAX_LENGTH = 15;
const PAY_MAX_LENGTH = 10;
const IRREGULAR_MAX_LENGTH = 10;
const MATCH_PAY = /^[1-9][0-9]*$/;
const MATCH_IRREGULAR = /^-?[1-9][0-9]*$/;
const REASON_MAX_ERROR_MESSAGE = '사유는 15자까지만 입력할 수 있습니다.';
const PAY_MAX_ERROR_MESSAGE = '급여는 10자리까지만 입력할 수 있습니다.';
const IRREGULAR_MAX_ERROR_MESSAGE =
  '비정상급여는 10자리까지만 입력할 수 있습니다.';
const NUMBER_ERROR_MESSAGE = '유효한 숫자가 아닙니다.';

const schema = z.object({
  reason: z
    .string()
    .max(REASON_MAX_LENGTH, { message: REASON_MAX_ERROR_MESSAGE }),
  pay: z
    .string({
      required_error: NUMBER_ERROR_MESSAGE,
    })
    .regex(MATCH_PAY, {
      message: NUMBER_ERROR_MESSAGE,
    })
    .max(PAY_MAX_LENGTH, {
      message: PAY_MAX_ERROR_MESSAGE,
    }),
  irregular: z
    .string({
      required_error: NUMBER_ERROR_MESSAGE,
    })
    .regex(MATCH_IRREGULAR, {
      message: NUMBER_ERROR_MESSAGE,
    })
    .max(IRREGULAR_MAX_LENGTH, { message: IRREGULAR_MAX_ERROR_MESSAGE }),
});

export default schema;
