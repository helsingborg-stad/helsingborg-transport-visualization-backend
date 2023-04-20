import 'reflect-metadata';
import 'module-alias/register';
import { initDB } from '@services/database';
import * as seeds from '../database/seeds';

initDB().then((connection) => {
  const entries = Object.entries(seeds);

  return Promise.all(
    entries.map(async ([seeder, callback]) => {
      if (typeof callback !== 'function') {
        return;
      }
      // eslint-disable-next-line no-console
      console.log(`Running seed ${seeder}`);
      callback(connection);
    }),
  );
});
