import { createClient, convertViemChainToRelayChain, MAINNET_RELAY_API, TESTNET_RELAY_API } from '@reservoir0x/relay-sdk'
import { mainnet } from 'viem/chains'
import { getClient } from '@reservoir0x/relay-sdk'
import { Address } from 'viem';

createClient({
    baseApiUrl: MAINNET_RELAY_API,
    source: "YOUR.SOURCE",
    chains: [convertViemChainToRelayChain(mainnet)]
});



export async function getSolverCapacity(destinationChainId: string, originChainId: string) {

    const data = await getClient()?.actions.getSolverCapacity({
        destinationChainId,
        originChainId,
    })
    return data;
}
export async function getPrice(
    originChainId: number, destinationChainId: number, originCurrency: string, destinationCurrency: string, amount: string, user: Address, recipient: Address
) {
    try {
        const price = await getClient()?.actions.getPrice({
            originChainId: originChainId,
            destinationChainId: destinationChainId,
            originCurrency: originCurrency,
            destinationCurrency: destinationCurrency,
            amount: amount,
            user: user,
            recipient: recipient,
            tradeType: "EXACT_INPUT",
        });
        const priceAmount = price.details?.currencyOut?.amountFormatted;
        return priceAmount;
    }
    catch (error) {
        return error;
    }
}
export async function getQuote(chainId: number, toChainId: number, currency: string, toCurrency: string, amount: string, recipient: Address) {
    const quote = await getClient()?.actions.getQuote({
        chainId: chainId,
        toChainId: toChainId,
        currency: currency,
        toCurrency: toCurrency,
        amount: amount,
        recipient: recipient,
        tradeType: "EXACT_INPUT",
    });
    return quote;
}
