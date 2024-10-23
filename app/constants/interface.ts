export interface Currency {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
}

export interface FixedRateMarket {
  from: string;
  to: string;
  min: number;
  max: number;
  rate: number;
  minerFee: number;
}

export interface ExchangeTransaction {
  id: string;
  payinAddress: string;
  payoutAddress: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  directedAmount: number;
  error: string;
  message: string;
}

export interface FixedRateExchangeTransaction extends ExchangeTransaction {
  payoutExtraId: string;
  refundAddress: string;
  refundExtraId: string;
  validUntil: string;
}

export interface ExchangeData {
  estimatedAmount: number;
  transactionSpeedForecast: string;
  warningMessage: string | null;
}
export interface FixedRateExchangeData extends ExchangeData {
  networkFee: number;
  rateId: string;
  validUntil: string;
}

export interface TransactionStatus {
  id: string;
  status: string;
  payinAddress: string;
  payoutAddress: string;
  fromCurrency: string;
  toCurrency: string;
  updatedAt: string;
  expectedSendAmount: number;
  expectedReceiveAmount: number;
  createdAt: string;
  isPartner: boolean;
  depositReceivedAt: string;
  payinExtraIdName: string;
  payoutExtraIdName: string;
  payinHash: string;
  payoutHash: string;
  payinExtraId: string;
  payoutExtraId: string;
  amountSend: number;
  amountReceive: number;
  tokensDestination: string;
  refundAddress: string;
  refundExtraId: string;
  validUntil: string;
  verificationSent: boolean;
  userId: string;
  payload: object;
}
