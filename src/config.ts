import * as path from 'path';

const envType = process.env.NODE_ENV?.trim();
export const isLocal = envType === 'local';

require('dotenv').config({
  path: path.join(__dirname, '..', `.env${isLocal ? '.local' : ''}`)
});

export const PORT = process.env.PORT || 3100;
export const MONGO_URL = process.env.MONGO_URL || '';
export const SECRET_KEY = process.env.SECRET_KEY || '';
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';
export const CLIENT_ID = process.env.CLIENT_ID || '';
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
export const REDIRECT_URL = process.env.REDIRECT_URL || '';
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN || '';
export const USEREMAIL = process.env.USEREMAIL || '';
export const PASSWORD = process.env.PASSWORD || '';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
export const BASE_URL = process.env.BASE_URL || '';
export const AWS_INVOICE_URL = process.env.INVOICE_URL || '';

export const MONGO_CONFIG = {
  poolSize: parseInt(process.env.MONGO_POOL_SIZE || '') || 5
};