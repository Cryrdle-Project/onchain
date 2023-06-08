// This example shows how to make call an API using a secret
// https://coinmarketcap.com/api/documentation/v1/

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const coinMarketCapCoinId = args[0]
const currencyCode = args[1]

if (
  !secrets.apiKey ||
  secrets.apiKey === "Your coinmarketcap API key (get a free one: https://coinmarketcap.com/api/)"
) {
  throw Error(
    "COINMARKETCAP_API_KEY environment variable not set for CoinMarketCap API.  Get a free key from https://coinmarketcap.com/api/"
  )
}

// build HTTP request object

const coinMarketCapRequest = Functions.makeHttpRequest({
  url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
  // Get a free API key from https://coinmarketcap.com/api/
  headers: { "X-CMC_PRO_API_KEY": secrets.apiKey },
  params: {
    id: "1",
    // id: "1,2,3,4,5,6,7,8,9,10",
    // sort: 'market_cap',
  },
})

// Make the HTTP request
const coinMarketCapResponse = await coinMarketCapRequest

if (coinMarketCapResponse.error) {
  throw new Error("CoinMarketCap Error")
}
const data = coinMarketCapResponse.data
const res = JSON.stringify(data.data["1"].name)

return Functions.encodeString(res)
