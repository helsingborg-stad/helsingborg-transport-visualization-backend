// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { User, UserTypes } from '@root/entities';

const buildUsers = async (amount: number) => {
  const usersList = [...Array(amount)].map(async (_, index) => {
    const user = new User(`user+${index}@$user.com`);

    await user.setPassword('password');
    user.userType = UserTypes.ADMIN;
    return user;
  });
  return Promise.all(usersList);
};

export const userSeeder = async (connection: Connection) => {
  const usersList = await buildUsers(10);

  return connection.createQueryBuilder().insert().into(User).values(usersList).execute();
};
