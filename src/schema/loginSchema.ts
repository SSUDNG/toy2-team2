import { z } from 'zod';

const ID_MAX_LENGTH = 30;
const ID_REGEX = /^[a-zA-Z0-9]*$/;
const ID_REGEX_ERROR = '영어와 숫자만 가능합니다.';
const PW_MIN_LENGTH = 8;
const PW_MAX_LENGTH = 30;
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/;
const PW_REGEX_ERROR =
  '비밀번호는 대소문자, 특수기호(#?!@$%^&*-)를 포함해야 합니다.';

const formSchema = z.object({
  id: z
    .string()
    .regex(ID_REGEX, ID_REGEX_ERROR)
    .max(ID_MAX_LENGTH, { message: '최대 30자입니다.' }),
  password: z
    .string()
    .min(PW_MIN_LENGTH, { message: '최소 8자 이상이어야 합니다.' })
    .max(PW_MAX_LENGTH, { message: '최대 30자 입니다.' })
    .regex(PW_REGEX, PW_REGEX_ERROR),
});

export default formSchema;
