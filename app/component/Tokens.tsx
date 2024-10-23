import { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import Modal from "./Modal";
const TokenButtons = ({ tokenStyle, setTokenStyle, style, tempTokenImage }: { tokenStyle: string, style: string, setTokenStyle: any, tempTokenImage: string }) => {
    const [isModalShow, setIsModalShow] = useState(false);
    const [tokenImage, setTokenImage] = useState(tempTokenImage);
    return (
        <>
            <div className="flex gap-1 items-center w-[30%]" onClick={() => { setIsModalShow(true) }}>
                <img src={tokenImage} alt="tokenimage" />
                {
                    tokenStyle.length > 5 ?
                        tokenStyle.slice(0, 4)
                        : tokenStyle
                }
                <RiArrowDownSFill className="size-9" />
            </div>
            {isModalShow && <Modal setTokenStyle={setTokenStyle} style={style} setIsModalShow={setIsModalShow} setTokenImage={setTokenImage} />}
        </>
    )
}
export default TokenButtons;
