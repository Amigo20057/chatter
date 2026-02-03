import { ERRORS } from "~/constants/errors";

export const formatError = (error: ERRORS) => {
  let value = "";
  switch (error) {
    case ERRORS.USER_NOT_EXISTS:
      value = "Користувача з таким email не знайдено";
      break;

    case ERRORS.USER_ALREADY_EXISTS_BY_EMAIL:
      value = "Користувач з таким email вже існує";
      break;

    case ERRORS.USER_ALREADY_EXISTS_BY_TAG:
      value = "Користувач з таким тегом існує";
      break;

    case ERRORS.INVALID_PASSWORD:
      value = "Невірний пароль";
      break;

    default:
      value = "Невідома помилка";
  }

  return value;
};
