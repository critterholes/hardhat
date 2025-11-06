// Import the Hardhat Runtime Environment (HRE)
const hre = require("hardhat");

async function main() {
  // Get 'ethers' from the HRE
  const { ethers } = hre;

  // Get the deployer's signer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy CritterHolesPoints
  const PointsFactory = await ethers.getContractFactory("CritterHolesPoints");
  const points = await PointsFactory.deploy(deployer.address);
  await points.waitForDeployment();
  const pointsAddress = await points.getAddress();
  console.log(`✅ CritterHolesPoints (CHP) deployed to: ${pointsAddress}`);

  // Deploy CritterHolesHammer
  const HammerFactory = await ethers.getContractFactory("CritterHolesHammer");
  const hammer = await HammerFactory.deploy(deployer.address);
  await hammer.waitForDeployment();
  const hammerAddress = await hammer.getAddress();
  console.log(`✅ CritterHolesHammer (HAMMER) deployed to: ${hammerAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });