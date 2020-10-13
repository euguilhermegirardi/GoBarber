import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import { injectable, inject } from 'tsyringe';

import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepositories from '../repositories/IUsersRepositories';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepositories
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {


    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    // user.password = Cryptic password
    // password = No Cryptic password

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    // md5 online for the 'hash'
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
