import mongoose from 'mongoose';

export class ValidatorsFacade {
  static isMongoID(id: string): boolean {
    if (isFinite(+id)) return false;

    return mongoose.isValidObjectId(id);
  }
}
