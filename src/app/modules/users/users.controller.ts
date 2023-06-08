import { Request, Response } from 'express'
import usersService from './users.service';

const createDBUser = async (req: Request, res: Response) => {
    try {
      const { user } = req.body;
      const result = await usersService.createUser(user)
      res.status(200).json({
        success: true,
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "User created Failed",
        error: error,
      });
    }
  }
export default {
    createDBUser
}