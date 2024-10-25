

const Modal = ({ setTokenStyle, style, setIsModalShow, setTokenImage, setTokenChain }: { setTokenStyle: any, style: string, setIsModalShow: any, setTokenImage: any, setTokenChain: any }) => {
    const tokens = [
        { title: "SOL", name: "Solana", image: "https://content-api.changenow.io/uploads/sol_3b3f795997.svg" },
        { title: "APE", name: "ape", image: "https://content-api.changenow.io/uploads/ape_fd3441632d.svg" },

    ]
    return (<>
        <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsModalShow(false)} />
        <div className={`absolute shadow-lg rounded-md flex flex-col bg-[#47434d] top-0
        sm:right-[20%] sm:justify-start justify-center sm:h-[500px] sm:w-[342px] sm:top-[50%] left-[50%] -translate-x-[50%] sm:-translate-y-[50%]
        z-10 w-full`}>
            <div className="flex justify-between px-4 py-4 sticky top-0 bg-[#1b1a1d] rounded-t-md text-2xl">
                <article>Select a currency</article>
                <button onClick={() => setIsModalShow(false)}>&times;</button>
            </div>
            <div className="hover:overflow-auto overflow-hidden w-full">
                {tokens.map((token) => {
                    return (
                        <button key={token.title} onClick={() => {
                            setTokenStyle(token.title);
                            setIsModalShow(false);
                            setTokenImage(token.image);
                            setTokenChain(token.name);
                        }} className="flex border-t-[1px] border-[#808086] py-2 px-4 items-center gap-4 w-full">
                            <img src={token.image} alt="image" className="size-10" />
                            <div className="flex flex-col text-left">
                                <article className="text-[16px] text-white">{token.title}</article>
                                <article className="text-sm text-[#d1d1db]">{token.name}</article>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    </>
    )
}
export default Modal;