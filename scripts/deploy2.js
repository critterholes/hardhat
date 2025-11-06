// Import the Hardhat Runtime Environment (HRE)
const hre = require("hardhat");
// Import dotenv to load environment variables
require("dotenv/config");

async function main() {
  // Get 'ethers' from the HRE
  const { ethers } = hre;

  // Get addresses from environment variables
  const CHP_ADDRESS = process.env.CHP_ADDRESS;
  const TOKEN2_ADDRESS = process.env.TOKEN2_ADDRESS;
  const TOKEN3_ADDRESS = process.env.TOKEN3_ADDRESS;
  const SUPER_SIGNER_ADDRESS = process.env.SUPER_SIGNER_ADDRESS;

  // Validate that all required environment variables are set
  if (!CHP_ADDRESS || !TOKEN2_ADDRESS || !TOKEN3_ADDRESS || !SUPER_SIGNER_ADDRESS) {
    throw new Error(
      "Missing environment variables. Please set CHP_ADDRESS, TOKEN2_ADDRESS, TOKEN3_ADDRESS, and SUPER_SIGNER_ADDRESS in your .env file"
    );
  }

  // Get the deployer's signer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying CHGame with the account:", deployer.address);

  // Log the constructor arguments that will be used
  console.log("Using constructor arguments:");
  console.log(`  _CHP: ${CHP_ADDRESS}`);
  console.log(`  _token2: ${TOKEN2_ADDRESS}`);
  console.log(`  _token3: ${TOKEN3_ADDRESS}`);
  console.log(`  _Super: ${SUPER_SIGNER_ADDRESS}`);

  // Deploy CHGame
  const GameFactory = await ethers.getContractFactory("CHGame");
  const game = await GameFactory.deploy(
    deployer.address, // initialOwner
    CHP_ADDRESS,
    TOKEN2_ADDRESS,
    TOKEN3_ADDRESS,
    SUPER_SIGNER_ADDRESS
  );

  await game.waitForDeployment();
  const gameAddress = await game.getAddress();
  console.log(`✅ CHGame deployed to: ${gameAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });