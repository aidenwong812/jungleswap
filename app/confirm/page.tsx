'use client'
import { useGlobalContext } from "../../context/GlobalContext";
import Footer from "../component/Footer";

const Confirm = () => {
    const { transactionInfo } = useGlobalContext();
    return (
        <>
            <div className="flex flex-col gap-3 text-white text-md px-6 -mt-28">
                <p className="text-2xl text-center py-4 text-[#ffffff]">Please send the funds you would like to exchange</p>
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
        </>
    )
}
export default Confirm;