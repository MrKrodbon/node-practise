import { HttpError } from 'http-errors';

export const errorHandler = (req, res, err, next) => {
  if (err instanceof HttpError) {
    res
      .status(err.status)
      .json({ status: err.status, message: err.name, data: err });
    return;
  }

  res.status(500).json({ message: 'Server are sleeping :)', err: err.message });
};
