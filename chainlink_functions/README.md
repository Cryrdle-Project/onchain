
1.
In order to run functions 
you should generate .env.enc with some api keys

POLYGON_MUMBAI_RPC_URL
PRIVATE_KEY
CONSUMER_CONTRACT_ADDRESS
COINMARKETCAP_API_KEY
GITHUB_API_TOKEN

via: npx env-enc view

2.
for testing via command line:

npx hardhat functions-simulate --configpath tutorials/