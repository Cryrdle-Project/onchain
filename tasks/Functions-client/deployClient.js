const { types } = require("hardhat/config")
const { networks } = require("../../networks")

task("functions-deploy-client", "Deploys the Cryrdle contract")
  .addOptionalParam("verify", "Set to true to verify client contract", false, types.boolean)
  .setAction(async (taskArgs) => {
    if (network.name === "hardhat") {
      throw Error(
        'This command cannot be used on a local hardhat chain.  Specify a valid network or simulate an Cryrdle request locally with "npx hardhat functions-simulate".'
      )
    }

    console.log(`Deploying Cryrdle contract to ${network.name}`)

    const oracleAddress = networks[network.name]["functionsOracleProxy"]
    const VRFSubscriptionId = networks[network.name]["subscriptionId"]
    const VRFGasLane = networks[network.name]["gasLane"]
    const KeepersTimeInterval = networks[network.name]["keepersUpdateInterval"]
    const ParticipationFee = networks[network.name]["cryrdleParticipationFee"]
    const VRFCallbackGasLimit = networks[network.name]["callbackGasLimit"]
    const VRFCoordinatorAddress = networks[network.name]["vrfCoordinatorV2"]
    const AdminWalletJK = networks[network.name]["walletJK"]
    const AdminWalletJS = networks[network.name]["walletJS"]

    console.log("\n__Compiling Contracts__")
    await run("compile")

    const clientContractFactory = await ethers.getContractFactory("Cryrdle")
    const clientContract = await clientContractFactory.deploy(
      VRFCoordinatorAddress,
      VRFSubscriptionId,
      VRFGasLane,
      KeepersTimeInterval,
      ParticipationFee,
      VRFCallbackGasLimit,
      AdminWalletJK,
      AdminWalletJS,
      oracleAddress
    )

    console.log(
      `\nWaiting ${networks[network.name].confirmations} blocks for transaction ${
        clientContract.deployTransaction.hash
      } to be confirmed...`
    )
    await clientContract.deployTransaction.wait(networks[network.name].confirmations)

    const verifyContract = taskArgs.verify

    if (verifyContract && !!networks[network.name].verifyApiKey && networks[network.name].verifyApiKey !== "UNSET") {
      try {
        console.log("\nVerifying contract...")
        await clientContract.deployTransaction.wait(Math.max(6 - networks[network.name].confirmations, 0))
        await run("verify:verify", {
          address: clientContract.address,
          constructorArguments: [oracleAddress],
        })
        console.log("Contract verified")
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log("Error verifying contract.  Delete the build folder and try again.")
          console.log(error)
        } else {
          console.log("Contract already verified")
        }
      }
    } else if (verifyContract) {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      )
    }

    console.log(`\nCryrdle contract deployed to ${clientContract.address} on ${network.name}`)
  })
