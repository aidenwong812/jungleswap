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
        const userBalance = price.details?.userBalance;
        return {priceAmount, userBalance};
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

export async function Getconfig() {
    const options = { method: 'GET' };

    fetch('https://api.relay.link/config/v2', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

export async function GetExecutionStatus() {
    const options = { method: 'GET' };

    fetch('https://api.relay.link/intents/status/v2', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

export async function GetRequests() {
    const options = { method: 'GET' };

    fetch('https://api.relay.link/requests/v2', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

export async function GetTokenPrice() {
    const options = { method: 'GET' };

    fetch('https://api.relay.link/currencies/token/price', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}