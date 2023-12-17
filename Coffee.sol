// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Coffee{
    address payable admin;

    struct Donation{
        string name;
        string message;
        uint timestamp;
        uint value;
        address sender;
    }

    Donation[] donations;

    constructor(){
        admin = payable(msg.sender);
    }

    function donateEth(string calldata _name, string calldata _message) public payable{
        require(msg.value>0, "0 Ethers provided");
        admin.transfer(msg.value);
        donations.push(Donation(_name, _message, block.timestamp, msg.value, msg.sender));
    }

    function getDonations() public view returns(Donation[] memory){
        return donations;
    }
}