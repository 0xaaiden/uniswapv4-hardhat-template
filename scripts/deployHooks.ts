
import { ethers } from "hardhat";
import { CREATE2Factory } from "@uniswap/v4-periphery/artifacts/contracts/libraries/CREATE2Factory.sol/CREATE2Factory.json";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await deployer.getBalance();
    console.log("Account balance:", (await ethers.utils.formatEther(balance)).toString());

    // CREATE2 address (hardcoded)
    const create2Address = "0x4e59b44847b379578588920cA78FbF26c0B4956C";
    const create2Factory = new ethers.Contract(create2Address, CREATE2Factory.abi, deployer);

    const Counter = await ethers.getContractFactory("Counter");

    // Calculate the bytecode for deployment
    const bytecode = Counter.bytecode;

    // Set up your hook permissions 
    const hookPermissions = ethers.BigNumber.from(
        "0x" +
        (0 | // beforeInitialize
            0 | // afterInitialize
            (1 << 1) | // beforeAddLiquidity
            0 | // afterAddLiquidity
            (1 << 2) | // beforeRemoveLiquidity 
            0 | // afterRemoveLiquidity
            (1 << 3) | // beforeSwap
            (1 << 4) | // afterSwap
            0 | // beforeDonate
            0) // afterDonate
    );

    const poolManagerAddress = "YOUR_POOL_MANAGER_ADDRESS"; // Replace with your actual Pool Manager address
    const salt = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(
        ["uint160", "bytes"],
        [hookPermissions, ethers.utils.defaultAbiCoder.encode(["address"], [poolManagerAddress])]
    ));

    // Deploy the hook using CREATE2
    const tx = await create2Factory.deploy(bytecode, salt);
    await tx.wait();

    // Get the hook address
    const hookAddress = await create2Factory.computeAddress(salt, ethers.utils.keccak256(bytecode));
    console.log("Hook deployed at:", hookAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});