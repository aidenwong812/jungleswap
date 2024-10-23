'use client'
import { useEffect, useState } from "react";
import Footer from "../component/Footer"
import axios from "axios";
import { useGlobalContext } from "@/context/GlobalContext";

const Airdrop = () => {
    const { userId } = useGlobalContext();
    const [isLoading, setIsloading] = useState(true);
    const [score, setScore] = useState(0);
    useEffect(() => {
        axios.post("/api/transactions/airdrop", { userId })
            .then((res) => {
                setIsloading(false);
                setScore(res.data.data);
            })
            .catch((err) => console.log(err));
    }, [])
    return (
        <div className="-mt-12">
            {
                isLoading ?
                <div className="animate-spin rounded-full border-[14px] border-white h-16 w-16 border-dotted"></div>
                    :
                    <div className="text-white text-2xl text-center p-3 font-bold">
                       { `You've received ${score} points for airdrop!`}
                    </div>
            }
            <Footer />
        </div>
    )
}
export default Airdrop;