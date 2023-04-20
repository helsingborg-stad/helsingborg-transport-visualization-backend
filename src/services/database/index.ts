import ormConnection from '@root/database/ormconfig';

export const initDB = async () => {
  if (ormConnection.isInitialized) {
    return ormConnection;
  }
  return ormConnection.initialize();
};

export const buildRepository = <T>(model) => ormConnection.getRepository<T>(model);