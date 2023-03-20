import { REQUEST_METOD } from './serverConstants';
import { ICurrencyResponse } from '../types/interfaces';

export default async function getCurrencies(): Promise<ICurrencyResponse> {
  const CURRENCY_KEY_NAME = 'apikey';
  const CURRENCY_KEY = 'PeCah3qWxLkLxKihImWNbHDMtuzMM5he';
  const CURRENCY_URL = 'https://api.apilayer.com/exchangerates_data/latest?symbols=USD,RUB,BYN,EUR,GEL,CHF,CNY&base=USD';

  const myHeaders = new Headers();
  myHeaders.append(CURRENCY_KEY_NAME, CURRENCY_KEY);

  const requestOptions: RequestInit = {
    method: REQUEST_METOD.GET,
    redirect: 'follow',
    headers: myHeaders,
  };

  const resp = await fetch(CURRENCY_URL, requestOptions);
  const data = resp.json();

  return data;
}
