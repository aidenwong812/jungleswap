
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from 'wagmi';

const Walletbutton = ({ style, setAddress }: { style: string, setAddress: any }) => {
    const { address } = useAccount();
    useEffect(() => {
        setAddress(address);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address])
    return (

        <div className="flex w-full gap-1 justify-between items-center">
            <article>{style}</article>
            <ConnectButton label={style} />
        </div>
    )
}
export default Walletbutton;