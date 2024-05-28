import { ethers } from "hardhat";

async function main() {
    const signers = await ethers.getSigners();

    // Deploy the PoolManager contract
    const poolManagerFactory = await ethers.getContractFactory("PoolManager");
    const poolManager = (await poolManagerFactory.deploy(500000)) as PoolManager; // 500,000 is the max tick liquidity growth, but you can adjust it

    await poolManager.deployed();

    console.log("PoolManager deployed to:", poolManager.address);

    // Optionally verify the contract on Etherscan
    // await hre.run("verify:verify", {
    //   address: poolManager.address,
    //   constructorArguments: [500000],
    // });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });