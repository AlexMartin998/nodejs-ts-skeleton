import { Response } from 'express';
import mongoose from 'mongoose';

import {
  BadRequestError,
  DomainError,
  InvalidArgumentError,
  ResourceNotFoundError,
} from '@/shared/domain';

export const handleRestExceptions = (error: any, res: Response) => {
  if (error instanceof DomainError) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ errors: [error.message] });
    } else if (error instanceof InvalidArgumentError) {
      return res.status(400).json({ errors: error.errors });
    } else if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ errors: [error.message] });
    } else {
      return res.status(500).json({ errors: [error.message] });
    }
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ errors: error.errors });
  }

  console.log(`${error}`);
  return res.status(500).json({ error: 'Internal server error' });
};
