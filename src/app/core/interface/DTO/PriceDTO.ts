export interface PriceDTO {
  "id": number,
  "price": number,
  "currency": 'USD' | 'VND',
  "scheme": "FLAT_RATE" | 'PER_UNIT',
  "cycle": "MONTH" | 'DAY' | 'WEEK' | 'YEAR',
  "cycleCount": number,
  "trialCycle": "MONTH" | 'DAY' | 'WEEK' | 'YEAR',
  "trialPeriod": number,
  "createdDate": string,
  "modifiedDate": string,
  "softDelete": boolean
}
