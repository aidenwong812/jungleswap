
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
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');
                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <button onClick={openConnectModal} type="button" className="px-2 bg-[#3f4c69] rounded-md opacity-90 hover:bg-[#16192b]">
                                            Connect Wallet
                                        </button>
                                    );
                                }
                                if (chain.unsupported) {
                                    return (
                                        <button onClick={openChainModal} type="button">
                                            Wrong network
                                        </button>
                                    );
                                }
                                return (
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <button onClick={openAccountModal} type="button" className="px-2 bg-[#6b724d] rounded-md opacity-90 hover:bg-[#70865e]">
                                            {account.displayName}
                                            {account.displayBalance
                                                ? ` (${account.displayBalance})`
                                                : ''}
                                        </button>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    )
}
export default Walletbutton;