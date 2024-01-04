async function main() {
  const VotingApp = await hre.ethers.getContractFactory("Voting");
  
  // Deploying the contract
  const voting = await VotingApp.deploy();
  await voting.deployed();

  console.log(`VotingApp deployed to: ${voting.address}`);
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
