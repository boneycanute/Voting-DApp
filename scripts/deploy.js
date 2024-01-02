import hre from "hardhat";

const Voting = await ethers.deployContract("Voting");

await lock.waitForDeployment();

console.log(`Deployed to ${Voting.address}`);
