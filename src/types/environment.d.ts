declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    NODE_ENV: string | 'development';
    TOKEN: string;
    FRONTEND_URL: string;
    DB_CONNECTION_NAME: string;
  }
}
