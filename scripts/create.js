async function createPoll() {
  // Load the contract
  const contractAddress = '0x707928f549030e728c170e215CfF7ddd8F1f86BB'; // Replace with your deployed contract address
  const VotingApp = await ethers.getContractFactory("VotingApp");
  const contract = VotingApp.attach(contractAddress);

  // Example poll details
  const pollId = ethers.utils.formatBytes32String("YOUR_POLL_ID");
  const title = "Example Poll Title 2";
  const description = "Example Poll Description 2 ";
  const durationInSeconds = 3600; // 1 hour, change as needed

  // Create the poll
  await contract.createPoll(pollId, title, description, durationInSeconds);
  console.log(`Poll created with ID: ${pollId}`);
}

createPoll()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
