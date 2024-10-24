'use client'
import React, { createContext, useContext, useState } from "react";

interface GlobalContextType {
    transactionInfo: {  
        payinAddress:string, 
        payoutAddress: string,
        fromCurrency:string,
        toCurrency:string,
        amount:number,
        directedAmount:number,
        transactionAction:string,
        transactionDescription:string,
        transactionId:string,
        transactionStatus:string
     };
    setTransactionInfo: React.Dispatch<React.SetStateAction<
    {   payinAddress:string, 
        payoutAddress: string,
        fromCurrency:string,
        toCurrency:string,
        amount:number,
        directedAmount:number,        
        transactionAction:string,
        transactionDescription:string,
        transactionId:string,
        transactionStatus:string
    }>>;   
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GlobalProvideProps {
    children: React.ReactNode;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider: React.FC<GlobalProvideProps> = ({ children }) => {

    const [transactionInfo, setTransactionInfo] = useState({ 
        payinAddress:"", 
        payoutAddress: "",
        fromCurrency:"",
        toCurrency:"",
        amount:0,
        directedAmount:0,
        transactionAction:"",
        transactionDescription:"",
        transactionId:"",
        transactionStatus:""
 
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value={{transactionInfo, setTransactionInfo, isLoading, setIsLoading}}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }

    return context;
}