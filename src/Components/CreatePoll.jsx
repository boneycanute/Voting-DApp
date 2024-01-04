import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contractABI, contractAddress } from '../Constants/constant';

function CreatePoll() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const navigate = useNavigate();

  const createPoll = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      await contractInstance.addPoll(title,description,parseInt(duration));
      console.log("Poll Created");
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <div className="MainContainer">
      <h1>Create your own poll</h1>
      <div className="SubContainer">
        <label>
          <h2 className="noVertMargin">Poll Title</h2>
          <input className="custom-input" placeholder="Poll Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          <h2>Description</h2>
          <input className="custom-input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          <h2>Duration in minutes</h2>
          <input type="number" className="custom-input" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </label>

        <button onClick={createPoll}>Save and Launch Poll</button>
      </div>
    </div>
  );
}

export default CreatePoll;
