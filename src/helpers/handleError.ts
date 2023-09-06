import { ErrorObject, ValidateFunction } from "ajv";
import betterAjvErrors from "better-ajv-errors";

type Errors = ErrorObject<string, Record<string, any>, unknown>[];
export const handleError = <T>(
  schema: ValidateFunction<T>,
  smartScripts: T,
  errors: Errors
) => {
  const output = betterAjvErrors(schema, smartScripts, errors, {
    indent: 2,
  });
  return output;
};
