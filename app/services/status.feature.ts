import prisma from '../api/database';
import { getEstimatedFixedRateExchangeAmount } from './change-now';

export const calculateAirdropPoint = async (
  inputCurrency: string,
  inputAmount: number,
  outAmount: number
): Promise<number> => {
  if (inputCurrency !== 'btc') {
    const estimatedAmountInBTC = await getEstimatedFixedRateExchangeAmount(
      inputCurrency,
      'btc',
      inputAmount,
    );
    if (estimatedAmountInBTC.estimatedAmount > 1) {
      return 250_000;
    }
    if (estimatedAmountInBTC.estimatedAmount > 0.5) {
      return 75_000;
    }
    if (estimatedAmountInBTC.estimatedAmount > 0.1) {
      return 25_000;
    }
    if (estimatedAmountInBTC.estimatedAmount > 0.01) {
      return 1500;
    }
    return 100;
  }
  else {
    if (outAmount > 1) {
      return 250_000;
    }
    if (outAmount > 0.5) {
      return 75_000;
    }
    if (outAmount > 0.1) {
      return 25_000;
    }
    if (outAmount > 0.01) {
      return 1500;
    }
    return 100;
  }
};
export const checkTransactionStatus = async (
  transactionStatus: any,
  userId: any
) => {
  const airdropPoint = await calculateAirdropPoint(
    transactionStatus.fromCurrency,
    transactionStatus.expectedSendAmount,
    transactionStatus.expectedReceiveAmount
  );
  const user = await prisma.user.findUnique({ where: { id: userId } })
  console.log(airdropPoint);
  console.log(user);

  if (user) {
    await prisma.user.update({
      where: { id: userId },
      data: { airdrop: user.airdrop + airdropPoint },
    });
  } else {
    await prisma.user.create({
      data: {
        id: userId,
        airdrop: airdropPoint,
      },
    });
  }
};