// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Voting {
    struct Poll {
        string title;
        string description;
        uint256 yesCount;
        uint256 noCount;
        uint256 votingStart;
        uint256 votingEnd;
        bool isActive;
    }

    Poll[] public polls; // Array of Polls
    address public owner; // Address of the owner
    mapping(address => mapping(uint256 => bool)) public hasVoted; // A Key-Value pair of user addresses and Whether they have voted

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    function addPoll(
        string memory _title,
        string memory _description,
        uint256 _durationInMinutes
    ) public {
        uint256 _votingStart = block.timestamp;
        uint256 _votingEnd = _votingStart + (_durationInMinutes * 1 minutes);

        polls.push(
            Poll({
                title: _title,
                description: _description,
                yesCount: 0,
                noCount: 0,
                votingStart: _votingStart,
                votingEnd: _votingEnd,
                isActive: true
            })
        );
    }

    function vote(uint256 _pollIndex, bool _vote) public {
        require(_pollIndex < polls.length, "Invalid poll index");
        require(polls[_pollIndex].isActive, "Voting ended");
        require(!hasVoted[msg.sender][_pollIndex], "Already voted");

        if (_vote) {
            polls[_pollIndex].yesCount++;
        } else {
            polls[_pollIndex].noCount++;
        }

        hasVoted[msg.sender][_pollIndex] = true;
    }

    function getAllRunningPolls() public view returns (Poll[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < polls.length; i++) {
            if (polls[i].isActive && polls[i].votingEnd > block.timestamp) {
                count++;
            }
        }

        Poll[] memory runningPolls = new Poll[](count);
        count = 0;
        for (uint256 i = 0; i < polls.length; i++) {
            if (polls[i].isActive && polls[i].votingEnd > block.timestamp) {
                runningPolls[count] = polls[i];
                count++;
            }
        }

        return runningPolls;
    }

    function getAllEndedPolls() public view returns (Poll[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < polls.length; i++) {
            if (polls[i].isActive && polls[i].votingEnd <= block.timestamp) {
                count++;
            }
        }

        Poll[] memory endedPolls = new Poll[](count);
        count = 0;
        for (uint256 i = 0; i < polls.length; i++) {
            if (polls[i].isActive && polls[i].votingEnd <= block.timestamp) {
                endedPolls[count] = polls[i];
                count++;
            }
        }

        return endedPolls;
    }
}
