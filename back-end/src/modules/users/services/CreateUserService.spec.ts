import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from "@shared/errors/AppError";

describe('CreateUser', async () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUserRepository;
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUserRepository;
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456'
    });

    expect(
      createUser.execute({
      name: 'John Doe',
      email: 'jhondoe@gmail.com',
      password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
