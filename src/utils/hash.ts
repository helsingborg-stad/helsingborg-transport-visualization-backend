import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashValue = async (text: string): Promise<string> => bcrypt.hash(text, SALT_ROUNDS);

// eslint-disable-next-line max-len
export const compareHashedValue = async (text: string, hashedValue: string): Promise<boolean> =>
  bcrypt.compare(text, hashedValue);
