import path from "path";
import fs from "fs";
import { injectable, inject } from 'tsyringe';

import User from "../infra/typeorm/entities/User";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import IUsersRepositories from '../repositories/IUsersRepositories';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepositories
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        "Only authenticated users can change the avatar.",
        401
      );
    }

    if (user.avatar) {
      // Delete the previous avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // Check if the file exist
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
