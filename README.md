# 🎮 CH Game Contract

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Solidity Version](https://img.shields.io/badge/Solidity-%5E0.8.20-lightgrey.svg)
![Built with Hardhat](https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg)

This repository contains the Solidity smart contracts for the **Critter Holes (CH)** game ecosystem. It includes an ERC1155 Hammer NFT, an ERC20 Points token, and the main `CHGame` logic contract, designed for deployment on EVM-compatible chains like Celo.

---

## 🔧 Getting Started

Follow these steps to clone, configure, and deploy the contracts.

### Step 1: Clone the Repository

First, clone this repository to your local machine and navigate into the project directory.

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Step 2: Install Dependencies

Install all the required npm packages, including Hardhat and OpenZeppelin.

```bash
npm install
```

### Step 3: What to Change (Configuration)

This is the most important step. You must configure your environment variables.

Create a new file named `.env` in the root of the project. Then, copy and paste the following template, filling in your own values.

```bash
# Your wallet's private key (do NOT share this)
PRIVATE_KEY="YOUR_DEPLOYER_PRIVATE_KEY"

# Your RPC URL for the network (e.g., Celo Mainnet or Alfajores Testnet)
CELO_RPC_URL="https://forno.celo.org"

# Your Celoscan API Key (for verification)
ETHERSCAN_API_KEY="YOUR_CELOSCAN_API_KEY"

# --------------------------------------------------------------------
# LEAVE THESE BLANK FOR NOW - You will fill them in after deployment.
# --------------------------------------------------------------------

# This address comes from Step 5
CHP_ADDRESS=""

# Address for your 2nd reward token (e.g., cUSD, WETH)
TOKEN2_ADDRESS="0x..."

# Address for your 3rd reward token
TOKEN3_ADDRESS="0x..."

# The wallet address your backend will use to sign claim messages
SUPER_SIGNER_ADDRESS="0x..."
```

---

## 🚀 Deployment using Hardhat

Deployment is a two-part process. You must run `deploy.js` first.

### Step 4: Compile Contracts

Compile all the contracts to make sure there are no errors.

```bash
npx hardhat compile
```

### Step 5: Run Deploy Script 1 (Points & Hammer)

This script deploys `CritterHolesPoints.sol` and `CritterHolesHammer.sol`.

```bash
npx hardhat run scripts/deploy.js --network celo
```

> **IMPORTANT:** After this script finishes, copy the `CritterHolesPoints (CHP)` contract address from your terminal.  
> Paste it into your `.env` file for the `CHP_ADDRESS` variable.

### Step 6: Run Deploy Script 2 (Main Game)

After updating your `.env` file with the `CHP_ADDRESS`, you can deploy the main `CHGame.sol` contract.

```bash
npx hardhat run scripts/deploy2.js --network celo
```

Your deployment is now complete! The terminal will show the final `CHGame` contract address.

### Step 7: Verify Contracts (Optional)

To verify your contracts on Celoscan, use the verify command.

#### Verify Hammer or Points
(These both take 1 constructor argument: the deployer's address)

```bash
npx hardhat verify --network celo <YOUR_HAMMER_CONTRACT_ADDRESS> "<YOUR_DEPLOYER_WALLET_ADDRESS>"
npx hardhat verify --network celo <YOUR_POINTS_CONTRACT_ADDRESS> "<YOUR_DEPLOYER_WALLET_ADDRESS>"
```

#### Verify CHGame
(This takes 5 constructor arguments, in order)

```bash
npx hardhat verify --network celo <YOUR_CHGAME_ADDRESS> "<DEPLOYER_ADDRESS>" "<CHP_ADDRESS>" "<TOKEN2_ADDRESS>" "<TOKEN3_ADDRESS>" "<SUPER_SIGNER_ADDRESS>"
```

---

## 🤝 Contributing

Pull requests are welcome!

If you'd like to contribute, please fork the repository and create a new pull request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project  
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the Branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

---

## ⚖️ License

This project is licensed under the **MIT License**.  
See the SPDX-License-Identifier in the contract files for more details.
