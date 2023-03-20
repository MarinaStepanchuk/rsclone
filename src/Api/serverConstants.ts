export const BASE_URL = 'https://mapmoney.onrender.com';

export enum Endpoint {
  REGISTER = '/api/user/register',
  LOGIN = '/api/user/login',
  USER_UPDATE = '/api/user',
  USER_UPDATE_PASSWORD = '/api/user/password',
  MESSEAGE = '/api/message',
  ACCOUNT = '/api/account',
  CATEGORY = '/api/category',
  EXPENSE = '/api/expense',
  INCOME = '/api/income',
}

export const REQUEST_METOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const RESPONSE_STATUS = {
  OK: 200,
  CREATED: 201,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
};

export const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };
