import { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import Modal from "./Modal";
const TokenButtons = ({ tokenStyle, setTokenStyle, style, tokenChain, setTokenChain, tempTokenImage }: { tokenStyle: string, style: string, setTokenStyle: any, tokenChain: string, setTokenChain: any, tempTokenImage: string }) => {
    const [isModalShow, setIsModalShow] = useState(false);
    const [tokenImage, setTokenImage] = useState(tempTokenImage);
    return (
        <>
            <div className="flex gap-1 items-center w-[30%]" onClick={() => { setIsModalShow(true) }}>
                <img src={tokenImage} alt="tokenimage" />
                <div className="flex flex-col items-center justify-center">
                    {
                        tokenStyle.length > 5 ?
                            tokenStyle.slice(0, 4)
                            : tokenStyle
                    }
                    <p className="text-xs">
                    {`(${tokenChain})`}
                    </p>
                </div>
                <RiArrowDownSFill className="size-9" />
            </div>
            {isModalShow && <Modal setTokenStyle={setTokenStyle} style={style} setIsModalShow={setIsModalShow} setTokenImage={setTokenImage} setTokenChain={setTokenChain} />}
        </>
    )
}
export default TokenButtons;
