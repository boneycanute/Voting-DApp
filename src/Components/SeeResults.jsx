import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../Constants/constant';

function SeeResults() {
  const [runningPolls, setRunningPolls] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        const runPolls = await contractInstance.getAllEndedPolls();

        // Convert BigNumber properties to strings
        const formattedPolls = runPolls.map((poll) => ({
          ...poll,
          yesCount: poll.yesCount.toString(),
          noCount: poll.noCount.toString(),
        }));

        setRunningPolls(formattedPolls);
        console.log(formattedPolls);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const vote =async (pollId , response) =>
  {
    console.log("Voting for ",pollId ," - ",response);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    await contractInstance.vote(pollId,response);
  }

  return (
    <>
      <h1> Completed Polls: {runningPolls.length}</h1>
      <table className='table-container'>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Yes Count</th>
            <th>No Count</th>
          </tr>
        </thead>
        <tbody>
          {runningPolls.map((poll, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{poll.title}</td>
              <td>{poll.description}</td>
              <td>{poll.yesCount}</td>
              <td>{poll.noCount}</td>
              {/* <td>
                <button onClick={()=>{vote(index,true);}}>Yes</button> : <button onClick={()=>{vote(index,false);}}>No</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SeeResults;
