import * as path from 'path';

const envType = process.env.NODE_ENV?.trim();
export const isLocal = envType === 'local';

require('dotenv').config({
    path: path.join(__dirname, '..', `.env${isLocal ? '.local' : ''}`)
  });

export const PORT = process.env.PORT || 3100;
export const MONGO_URL = process.env.MONGO_URL || '';
export const MONGO_CONFIG = {
  poolSize: parseInt(process.env.MONGO_POOL_SIZE || '') || 5
};