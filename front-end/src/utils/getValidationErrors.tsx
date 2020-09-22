import { ValidationError } from "yup";

interface Errors {
  [key: string]: string; // Same as name: string; email: string; password: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  // 'inner' is inside of the 'unform'. Same to 'path' and 'message',
  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
