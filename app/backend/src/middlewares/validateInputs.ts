import { Request, Response, NextFunction } from 'express';

const validateInputs = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'All fields must be filled' });
  } else {
    next();
  }
};

export default validateInputs;
