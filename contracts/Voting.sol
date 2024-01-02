// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";

contract Voting {
    using Counters for Counters.Counter;

    struct Poll {
        string name;
        string description;
        Counters.Counter yesVotes;
        Counters.Counter noVotes;
        bool isActive;
    }

    mapping(uint256 => Poll) public polls;
    Counters.Counter public pollCounter;

    event PollCreated(uint256 indexed pollId, string name, string description);
    event Voted(uint256 indexed pollId, bool choice, address voter);

    function createPoll(
        string memory _name,
        string memory _description
    ) external {
        polls[pollCounter] = Poll(
            _name,
            _description,
            Counters.Counter(0),
            Counters.Counter(0),
            true
        );
        emit PollCreated(pollCounter, _name, _description);
        pollCounter.increment();
    }

    function vote(uint256 _pollId, bool _choice) external {
        require(_pollId < pollCounter.current(), "Invalid poll ID");
        require(polls[_pollId].isActive, "Poll is not active");

        if (_choice) {
            polls[_pollId].yesVotes.increment();
        } else {
            polls[_pollId].noVotes.increment();
        }
        emit Voted(_pollId, _choice, msg.sender);
    }

    function getPollDetails(
        uint256 _pollId
    )
        external
        view
        returns (
            string memory name,
            string memory description,
            uint256 yesVotes,
            uint256 noVotes,
            bool isActive
        )
    {
        require(_pollId < pollCounter.current(), "Invalid poll ID");
        name = polls[_pollId].name;
        description = polls[_pollId].description;
        yesVotes = polls[_pollId].yesVotes.current();
        noVotes = polls[_pollId].noVotes.current();
        isActive = polls[_pollId].isActive;
    }
}
