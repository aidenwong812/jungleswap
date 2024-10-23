import axios from 'axios';

import {
  Currency,
  ExchangeData,
  ExchangeTransaction,
  FixedRateExchangeData,
  FixedRateExchangeTransaction,
  FixedRateMarket,
  TransactionStatus,
} from '../constants/interface';

const V1_BASE_URL = 'https://api.relay.link';
const apiKey = process.env.NEXT_PUBLIC_ChangeNOW_API_KEY;

export const getAvailableChains = async (): Promise<Currency[]> => {
  const res = await axios.get(`${V1_BASE_URL}/chains`);

  return res.data;
};

export const getAvailableFixedRateMarkets = async (): Promise<
  FixedRateMarket[]
> => {
  const res = await axios.get(
    `${V1_BASE_URL}/market-info/fixed-rate/${apiKey}`,
  );

  return res.data;
};

export const getMinimalExchangeAmount = async (
  inputCurrency: string,
  outputCurrency: string,
): Promise<number> => {
  const res = await axios.get(
    `${V1_BASE_URL}/min-amount/${inputCurrency}_${outputCurrency}?api_key=${apiKey}`,
  );

  return res.data?.minAmount || 0;
};

export const getEstimatedFixedRateExchangeAmount = async (
  inputCurrency: string,
  outputCurrency: string,
  inputAmount: number,
): Promise<FixedRateExchangeData> => {
  const res = await axios.get(
    `${V1_BASE_URL}/exchange-amount/fixed-rate/${inputAmount}/${inputCurrency}_${outputCurrency}?api_key=${apiKey}&useRateId=true`,
  );

  return res.data;
};

export const getEstimatedExchangeAmount = async (
  inputCurrency: string,
  outputCurrency: string,
  inputAmount: number,
): Promise<ExchangeData> => {
  const res = await axios.get(
    `${V1_BASE_URL}/exchange-amount/${inputAmount}/${inputCurrency}_${outputCurrency}?api_key=${apiKey}`,
  );
  return res.data;
};

export const createFixedRateExchangeTransaction = async (
  inputCurrency: string,
  outputCurrency: string,
  inputAmount: number,
  recipientAddress: string,
): Promise<FixedRateExchangeTransaction> => {
  const res = await axios.post(
    `${V1_BASE_URL}/transactions/fixed-rate/${apiKey}`,
    {
      from: inputCurrency,
      to: outputCurrency,
      amount: inputAmount,
      address: recipientAddress,
    },
  );

  return res.data;
};

export const createExchangeTransaction = async (
  inputCurrency: string,
  outputCurrency: string,
  inputAmount: number,
  recipientAddress: string,
): Promise<ExchangeTransaction> => {
  try {
    const res = await axios.post(`${V1_BASE_URL}/transactions/${apiKey}`, {
      from: inputCurrency,
      to: outputCurrency,
      amount: inputAmount,
      address: recipientAddress,
    });

    return res.data;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error.response.data);

    return {
      id: '',
      payinAddress: '',
      payoutAddress: recipientAddress,
      fromCurrency: inputCurrency,
      toCurrency: outputCurrency,
      amount: inputAmount,
      directedAmount: 0,
      error: error.response.data.error,
      message: error.response.data.message,
    };
  }
};

export const getTransactionStatus = async (
  transactionId: string,
): Promise<TransactionStatus | { status: 'error' }> => {
  try {
    const res = await axios.get(
      `${V1_BASE_URL}/transactions/${transactionId}/${apiKey}`,
    );
    return res.data;
  } catch {
    return { status: 'error' };
  }
};
