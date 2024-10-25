
import TokenButtons from "./Tokens";

const InputCurrency = (
    { style, setCurrency, currency, tokenStyle, setTokenStyle, inputError, tokenChain, setTokenChain }:
        { style: string, setCurrency: any, currency: number, tokenStyle: string, setTokenStyle: any, inputError: string, tokenChain: string, setTokenChain: any }
) => {
    const apeImage = "https://content-api.changenow.io/uploads/ape_fd3441632d.svg";
    const solImage = "https://content-api.changenow.io/uploads/sol_3b3f795997.svg";
    return (
        <>
            <div className={`border-[1px] border-[#dde2ea] ${inputError ? "rounded-t-md" : "rounded-md"} flex gap-2 w-full`}>
                <div className="px-[17px] border-r-[1px] border-[#dde2ea] w-full">
                    <article className=" text-sm text-opacity-70 opacity-80">You {style}</article>
                    <input type="number" className="text-green-600 w-full bg-transparent ring-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pb-2"
                        value={currency} onChange={(e) => {
                            if (style === "Send") {
                                setCurrency(e.target.value);
                            }
                        }} />
                </div>
                <TokenButtons tokenStyle={tokenStyle} setTokenStyle={setTokenStyle} style={style} tokenChain={tokenChain} setTokenChain={setTokenChain} tempTokenImage={style === "Send" ? apeImage : solImage} />
            </div>
            <div className={`bg-[#292727] text-red-500 text-[14px] ${inputError ? "px-2" : "p-0"} rounded-b-md duration-200`}>
                {inputError}
            </div>
        </>

    )
}
export default InputCurrency;