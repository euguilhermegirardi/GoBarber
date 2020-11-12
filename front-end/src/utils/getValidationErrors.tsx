// 'Exibindo erros no input' - GoStack video.
import { ValidationError } from "yup";

interface Errors {
  [key: string]: string; // Same as name: string; email: string; password: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  // 'inner' is inside of the 'unform'. Same to 'path' and 'message'
  // All of them comes from 'err' which comes from 'ValidationError' from yup.
  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
