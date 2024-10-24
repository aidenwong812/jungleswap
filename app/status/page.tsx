'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { LuRefreshCw } from "react-icons/lu";
import Footer from "../component/Footer";
import { useGlobalContext } from "@/context/GlobalContext";

const Status = () => {
    const { transactionInfo } = useGlobalContext();
    const [isLoading, setIsloading] = useState(false);
    const transactionId = transactionInfo.transactionId;
    const [transactionStatus, setTransactionStatus] = useState("");
    const handleStatus = () => {
        setIsloading(true);
        axios.post("/api/transactions/status", {transactionId })
            .then((res) => {
                 console.log(res.data.data);
                 setTransactionStatus(res.data.data);
                 setIsloading(false);
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        handleStatus();
    }, [])
    return (
        <div className="flex flex-col justify-center gap-4 px-4  -mt-28">
            <p className="text-2xl font-bold text-center py-4 text-[#ffffff]">{transactionStatus.toUpperCase()}</p>
            <div className="py-4">
                <button className="py-1 px-2 rounded-md hover:bg-[#35177a] touch-pan-left bg-[#504f4f] text-white text-sm float-end w-20 outline-none opacity-80"
                    onClick={handleStatus}
                    disabled={isLoading}
                >
                    <div className="flex gap-2 justify-center items-center">
                        <LuRefreshCw className={`${isLoading ? "animate-spin" : " animate-none"} `} />
                        Reset
                    </div>
                </button>
            </div>
            <div className="flex flex-col gap-3 text-white text-md px-6">
                <p className="text-xl font-bold text-center py-4 text-[#ffffff]">{transactionInfo.transactionAction}</p>
                <p className="text-xl text-center py-4 text-[#ffffff]">{transactionInfo.transactionDescription}</p>
                <div className="flex gap-4">Amount
                    <p className="font-bold text-[18px]">{transactionInfo.directedAmount} {transactionInfo.fromCurrency.toUpperCase()}</p>
                </div>
                <div>
                    <p>To this address : </p>
                    <p className="text-green-500 font-bold text-[18px] break-all pl-4">  {transactionInfo.payinAddress}
                    </p>
                </div>
                <div className="flex gap-4">You Get
                    <p className="font-bold text-[18px]">{transactionInfo.amount} {transactionInfo.toCurrency.toUpperCase()}</p>
                </div>
                <div>
                    <p>Recipitent Wallet:</p>
                    <p className="break-all text-green-500 font-bold text-[18px] pl-4"> {transactionInfo.payoutAddress}
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Status;