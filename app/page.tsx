"use client"

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { custom, useWalletClient } from 'wagmi';
import { createWalletClient, http } from "viem";
import { apeChain } from "viem/chains";
import InputCurrency from "./component/Input";
import { useGlobalContext } from "../context/GlobalContext";
import Footer from "./component/Footer";
import { getPrice, GetQuote } from "./services/relay";
import Walletbutton from "./component/Wallets";

export default function Home() {
  const router = useRouter();
  const { setTransactionInfo, setIsLoading, isLoading } = useGlobalContext();
  const [inputAmount, setInputAmount] = useState<any>();
  const [outAmount, setOutAmount] = useState<any>();
  const [fromAddress, setFromAddress] = useState<any>();
  const [toAddress, setToAddress] = useState<any>();
  const [inputCurrency, setInputCurrency] = useState<string>("APE");
  const [outCurrency, setOutCurrency] = useState<string>("SOL");
  const [inputError, setInputError] = useState<string>("");
  const [inputTokenChain, setInputTokenChain] = useState<string>('ape');
  const [outTokenChain, setOutTokenChain] = useState<string>('Solana');

  // const { data: wallet } = useWalletClient({
  //   account: fromAddress,
  // });

  const wallet = createWalletClient({
    account: fromAddress,
    chain: apeChain,
    transport: http()
  })

  useEffect(() => {
    fetchAmount();
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
    if (outChainId === inputChainId) {
      toast.warn("Sender and recipient cannot be the same for 'send' transactions");
      setInputError("");
    }
  }

  const fetchAmount = async () => {
    const outChainId = GetchainId(outCurrency);
    const inputChainId = GetchainId(inputCurrency);
    const outCurrencyId = GetCurrencyaddress(outCurrency);
    const inputCurrencyId = GetCurrencyaddress(inputCurrency);
    setInputError("");
    if (fromAddress && toAddress && inputAmount) {
      const tempInputAmount = inputCurrency === 'SOL' ? inputAmount * 1e9 : inputAmount * 1e18;
      setIsLoading(true);
      const tempOutAmount: any = await getPrice(inputChainId, outChainId, inputCurrencyId, outCurrencyId, String(tempInputAmount), fromAddress, toAddress);
      setIsLoading(false);
      toast.error(tempOutAmount.message);
      setOutAmount(tempOutAmount.priceAmount);
    }
  };



  const handleTransaction = async () => {
    try {
      if (wallet) {
        const outChainId = GetchainId(outCurrency);
        const inputChainId = GetchainId(inputCurrency);
        const outCurrencyId = GetCurrencyaddress(outCurrency);
        const inputCurrencyId = GetCurrencyaddress(inputCurrency);
        const quote = await GetQuote(
          inputChainId,
          outChainId,
          inputCurrencyId,
          outCurrencyId,
          String(inputAmount * 1e18),
          toAddress,
          wallet,
        );
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
            transactionId: quote.steps[0].requestId
          });
          router.push('/status');
        }
        else toast.error('Failed to create transaction.')
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
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
          tokenChain={inputTokenChain}
          setTokenChain={setInputTokenChain}
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <div className="flex justify-between items-center">
          <article>Deposit Wallet</article>
          <Walletbutton style="Get" setAddress={setFromAddress} />
        </div>
      </div>
      <div className="w-full">
        <InputCurrency
          style="Get"
          setCurrency={setOutAmount}
          currency={outAmount}
          tokenStyle={outCurrency}
          setTokenStyle={setOutCurrency}
          inputError={""}
          tokenChain={outTokenChain}
          setTokenChain={setOutTokenChain}
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
        className="w-full rounded-full border-[1px] border-[#dde2ea] py-2 bg-radial-gradient from-transparent to-[#47434d]  hover:-translate-y-1 duration-300
                    disabled:bg-[#413f44] disabled:text-[#5a5858]"
        onClick={handleTransaction} disabled={isLoading}
      >
        Confirm
      </button>
      <Footer />
    </div>
  );
}
