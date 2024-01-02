// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VotingApp {
    struct Poll {
        string title;
        string description;
        uint256 endTime;
        bool ended;
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) hasVoted;
    }

    mapping(bytes32 => Poll) public polls;
    bytes32[] public endedPolls;

    event PollCreated(
        bytes32 pollId,
        string title,
        string description,
        uint256 endTime
    );
    event Voted(bytes32 pollId, address voter, bool vote);
    event PollEnded(bytes32 pollId, uint256 yesVotes, uint256 noVotes);

    function createPoll(
        bytes32 pollId,
        string memory title,
        string memory description,
        uint256 durationInSeconds
    ) public {
        require(polls[pollId].endTime == 0, "Poll ID already exists");

        uint256 endTime = block.timestamp + durationInSeconds;
        polls[pollId].title = title;
        polls[pollId].description = description;
        polls[pollId].endTime = endTime;
        polls[pollId].ended = false;
        polls[pollId].yesVotes = 0;
        polls[pollId].noVotes = 0;

        emit PollCreated(pollId, title, description, endTime);
    }

    function vote(bytes32 pollId, bool voteOption) public {
        Poll storage poll = polls[pollId];
        require(!poll.ended, "Poll has ended");
        require(poll.endTime > block.timestamp, "Poll has expired");
        require(!poll.hasVoted[msg.sender], "Already voted");

        if (voteOption) {
            poll.yesVotes++;
        } else {
            poll.noVotes++;
        }
        poll.hasVoted[msg.sender] = true;
        emit Voted(pollId, msg.sender, voteOption);
    }

    function endPoll(bytes32 pollId) public {
        Poll storage poll = polls[pollId];
        require(!poll.ended, "Poll already ended");
        require(poll.endTime <= block.timestamp, "Poll has not ended yet");

        poll.ended = true;
        endedPolls.push(pollId);
        emit PollEnded(pollId, poll.yesVotes, poll.noVotes);
    }

    function getEndedPolls() public view returns (bytes32[] memory) {
        return endedPolls;
    }
}
