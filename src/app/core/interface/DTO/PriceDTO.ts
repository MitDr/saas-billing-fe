export interface PriceDTO{
  "id": number,
  "price": number,
  "currency": 'USD' | 'VND',
  "cycle": "MONTH" | 'DAY' | 'WEEK' | 'YEAR',
  "cycleCount": number,
  "trialPeriod": number,
  "createdDate": string,
  "modifiedDate": string,
  "softDelete": boolean
}
