export const BASE_URL = 'http://localhost:3005';

export enum Endpoint {
  REGISTER = '/api/user/register',
  LOGIN = '/api/user/login',
  USER_UPDATE = '/api/user',
  MESSEAGE = '/api/message',
  ACCOUNT = '/api/account',
  CATEGORY = '/api/category',
  EXPENSE = '/api/expense',
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
};

export const CONTENT_TYPE_JSON = { 'Content-Type': 'application/json' };
