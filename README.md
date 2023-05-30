# on-chain
## Contains all operations that are on-chain.

### Achievements
At current, I worked on the following function: 
1. joinCryrdle() --> Join the Game by paying the participation fee and adding the address to the participants array.
1. addPoints() --> A function that allows us to give points to participants based on their correct guesses. At the same time it also updates the winner array.
1. checkUpkeep() --> This function makes sure that the game is restarted every 24 hours.
1. performUpkeep() --> This function initiates the fulfillRandomWords function when upkeep needed.
1. fulfillRandomWords() --> provide a .This function (1)pays out every address that has the highest highscore, (2) updates the coin of the day via a random number between 1-100, and (3) restarts the game by reinitiating the game state.
1. And a bunch of helper functions!

## Steps

1. Clone this repository to your local machine<br><br>
2. Open this directory in your command line, then run `npm install` to install all dependencies.<br><br>
3. Aquire a Github personal access token which allows reading and writing Gists.
   1. Visit [https://github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta) and click "Generate new token"
   2. Name the token and enable read & write access for Gists from the "Account permissions" drop-down menu. Do not enable any additional permissions.
   3. Click "Generate token" and copy the resulting personal access token for step 4.<br><br>
4. Set the required environment variables.
   1. Set an encryption password for your environment variables to a secure password by running:<br>`npx env-enc set-pw`<br>
   2. Use the command `npx env-enc set` to set the required environment variables (see [Environment Variable Management](#environment-variable-management)):
      - _GITHUB_API_TOKEN_ for your Github token obtained from step 3
      - _PRIVATE_KEY_ for your development wallet
      - _POLYGON_MUMBAI_RPC_URL_, _ETHEREUM_SEPOLIA_RPC_URL_, _AVALANCHE_FUJI_RPC_URL_ for the network that you intend to use
   3. If desired, the `<explorer>_API_KEY` can be set in order to verify contracts, along with any values used in the _secrets_ object in _Functions-request-config.js_ such as `COINMARKETCAP_API_KEY`.<br><br>
5. There are two files to notice that the default example will use:
   - _contracts/FunctionsConsumer.sol_ contains the smart contract that will receive the data
   - _calculation-example.js_ contains JavaScript code that will be executed by each node of the DON<br><br>
6. Test an end-to-end request and fulfillment locally by simulating it using:<br>`npx hardhat functions-simulate`<br><br>
7. Deploy and verify the client contract to an actual blockchain network by running:<br>`npx hardhat functions-deploy-client --network network_name_here --verify true`<br>**Note**: Make sure `<explorer>_API_KEY` is set if using `--verify true`, depending on which network is used.<br><br>
8. Create, fund & authorize a new Functions billing subscription by running:<br> `npx hardhat functions-sub-create --network network_name_here --amount LINK_funding_amount_here --contract 0xDeployed_client_contract_address_here`<br>**Note**: Ensure your wallet has a sufficient LINK balance before running this command. Testnet LINK can be obtained at <a href="https://faucets.chain.link/">faucets.chain.link</a>.<br><br>
9. Make an on-chain request by running:<br>`npx hardhat functions-request --network network_name_here --contract 0xDeployed_client_contract_address_here --subid subscription_id_number_here`

## Output

bash-3.2$ npx hardhat functions-deploy-client --network ethereumSepolia --verify false
secp256k1 unavailable, reverting to browser version
Deploying Cryrdle contract to ethereumSepolia

__Compiling Contracts__
Nothing to compile

Waiting 2 blocks for transaction 0x6122fe6e4b647f9a281eea6fd8ee92cf68546eeeba77e636c6bfc43bb6220e3a to be confirmed...

Cryrdle contract deployed to 0x13628eC3603e93c69F4cd85dfD6B3524D0062D87 on ethereumSepolia
bash-3.2$ npx hardhat functions-sub-create --network ethereumSepolia --amount 5 --contract 0x13628eC3603e93c69F4cd85dfD6B3524D0062D87
secp256k1 unavailable, reverting to browser version
Creating Functions billing subscription
Waiting 1 blocks for transaction 0x0989496de168049ab2ba3aab3f224acafa3d63b1df9797a612f198235cfad41e to be confirmed...
Subscription created with ID: 355
Duplicate definition of Transfer (Transfer(address,address,uint256,bytes), Transfer(address,address,uint256))
Funding with 5.0 LINK
Waiting 1 blocks for transaction 0x29707518ce8de85318723fa995e7d5bf5c6915755cb94df7c1e3488b840f3428 to be confirmed...
Subscription 355 funded with 5.0 LINK
Adding consumer contract address 0x13628eC3603e93c69F4cd85dfD6B3524D0062D87 to subscription 355
Waiting 2 blocks for transaction 0xde46cc9488e9253955dd79ccdb760a70650e46479f68c16044d5664af24210a2 to be confirmed...
Authorized consumer contract: 0x13628eC3603e93c69F4cd85dfD6B3524D0062D87

Created subscription with ID: 355
Owner: 0xC24d2a947B4AF45964Dc316a63cC1BFb373E81E8
Balance: 5.0 LINK
1 authorized consumer contract:
[ '0x13628eC3603e93c69F4cd85dfD6B3524D0062D87' ]