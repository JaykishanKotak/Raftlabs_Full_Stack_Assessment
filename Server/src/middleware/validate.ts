import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema, ValidationError } from 'yup';

interface ValidationSchema {
  body?: AnyObjectSchema;
  query?: AnyObjectSchema;
  params?: AnyObjectSchema;
}

export const validate =
  (schema: ValidationSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      if (schema.body) {
        req.body = await schema.body.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });
      }

      if (schema.query) {
        req.query = (await schema.query.validate(req.query, {
          abortEarly: false,
          stripUnknown: true,
        })) as any;
      }

      if (schema.params) {
        req.params = (await schema.params.validate(req.params, {
          abortEarly: false,
          stripUnknown: true,
        })) as any;
      }

      return next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          status: 'fail',
          message: 'Validation failed',
          errors: error.inner.reduce((acc: Record<string, string>, err) => {
            if (err.path) {
              acc[err.path] = err.message;
            }
            return acc;
          }, {}),
        });
      }
      return next(error);
    }
  };
