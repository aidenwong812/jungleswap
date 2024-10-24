"use client"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import InputCurrency from "./component/Input";
import { useGlobalContext } from "../context/GlobalContext";
import Footer from "./component/Footer";
import { getSolverCapacity, getPrice, getQuote } from "./services/relay";
import Walletbutton from "./component/Wallets";
import { config } from './wagmi';
const queryClient = new QueryClient();

export default function Home() {
  const router = useRouter();
  const { setTransactionInfo, setIsLoading } = useGlobalContext();
  const [inputAmount, setInputAmount] = useState<any>();
  const [outAmount, setOutAmount] = useState<any>();
  const [fromAddress, setFromAddress] = useState<any>();
  const [toAddress, setToAddress] = useState<any>();
  const [inputCurrency, setInputCurrency] = useState<string>("APE");
  const [outCurrency, setOutCurrency] = useState<string>("SOL");
  const [inputError, setInputError] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [inputMinimumAmount, setInputminimumAmount] = useState<number>(2.5);

  useEffect(() => {
    fetchAmount();
    console.log(fromAddress)
  }, [inputAmount, fromAddress, toAddress]);

  useEffect(() => {
    fetchCurrency();
    fetchAmount();
  }, [inputCurrency, outCurrency]);

  const GetchainId = (currency: string) => {
    switch (currency) {
      case 'SOL': return 792703809;
      case 'APE': return 33139;
      default: return 792703809;
    }
  };

  const GetCurrencyaddress = (currency: string) => {
    switch (currency) {
      case 'SOL': return "11111111111111111111111111111111";
      case 'APE': return "0x0000000000000000000000000000000000000000";
      default: return "11111111111111111111111111111111";
    }
  }

  const fetchCurrency = async () => {
    const outChainId = GetchainId(outCurrency);
    const inputChainId = GetchainId(inputCurrency);
    const solverCapacity = await getSolverCapacity(String(inputChainId), String(outChainId));
    console.log(solverCapacity);
    if (solverCapacity.solver?.balance) {
      setInputminimumAmount(Number(solverCapacity.solver?.balance) / 1e22);
    }
  }

  const fetchAmount = async () => {
    const outChainId = GetchainId(outCurrency);
    const inputChainId = GetchainId(inputCurrency);
    const outCurrencyId = GetCurrencyaddress(outCurrency);
    const inputCurrencyId = GetCurrencyaddress(inputCurrency);
    if (inputAmount && inputAmount > inputMinimumAmount) {
      setInputError("");
      if (fromAddress && toAddress) {
        setIsLoading(false)
        const tempOutAmount: any = await getPrice(inputChainId, outChainId, inputCurrencyId, outCurrencyId, String(inputAmount * 1e18), fromAddress, toAddress);
        toast.error(tempOutAmount.message);
        setOutAmount(tempOutAmount.priceAmount);
        setUserBalance(tempOutAmount.userBalance);
      }
    } else {
      setInputError(`Send currency amount is very small. Minimum currency amount is ${inputMinimumAmount}.`);
    }
  };

  const handleTransaction = async () => {
    try {
      const outChainId = GetchainId(outCurrency);
      const inputChainId = GetchainId(inputCurrency);
      const outCurrencyId = GetCurrencyaddress(outCurrency);
      const inputCurrencyId = GetCurrencyaddress(inputCurrency);
      const quote: any = await getQuote(inputChainId, outChainId, inputCurrencyId, outCurrencyId, String(inputAmount * 1e18), toAddress);
      console.log(quote);
      if (quote.steps[0].requestId) {
        setTransactionInfo({
          payinAddress: toAddress,
          payoutAddress: fromAddress,
          fromCurrency: inputCurrency,
          toCurrency: outCurrency,
          amount: outAmount,
          directedAmount: inputAmount,
          transactionAction: quote.steps[0].action,
          transactionDescription: quote.steps[0].description,
          transactionId: quote.steps[0].requestId,
          transactionStatus: quote.steps[0].items[0].status
        });
        router.push('/status');
      }
      else toast.error('Failed to create transaction.')

    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="w-full text-white flex flex-col justify-center items-center -mt-20 sm:px-[70px] gap-8 p-4">
            <article className="text-2xl">Exchange Crypto</article>
            <div className="w-full">
              <InputCurrency
                style="Send"
                setCurrency={setInputAmount}
                currency={inputAmount}
                tokenStyle={inputCurrency}
                setTokenStyle={setInputCurrency}
                inputError={inputError}
              />
            </div>
            <Walletbutton style={'Connect Deposit Wallet'} setAddress={setFromAddress} />
            <div className="w-full">
              <InputCurrency
                style="Get"
                setCurrency={setOutAmount}
                currency={outAmount}
                tokenStyle={outCurrency}
                setTokenStyle={setOutCurrency}
                inputError={""}
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <article>Recipient Wallet</article>
              <input
                className="w-full rounded-md outline-none bg-transparent border-[1px] border-[#dde2ea] p-2"
                placeholder={`Enter the ${outCurrency} payout address`}
                onChange={(e) => setToAddress(e.target.value)}
              />
            </div>

            <button
              className="w-full rounded-full border-[1px] border-[#dde2ea] py-2 bg-radial-gradient from-transparent to-[#47434d] hover:-translate-y-1 duration-300
                          disabled:bg-[#413f44] disabled:text-[#5a5858]"
              onClick={handleTransaction} disabled={userBalance > inputAmount}
            >
              Confirm
            </button>
            <Footer />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
