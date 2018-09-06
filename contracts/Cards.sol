pragma solidity ^0.4.15;

contract Cards {

    string public url;

    event urlEvent(string _url, address indexed _from);
    
    function setUrl(string _newUrl) public {
        url = _newUrl;
        emit urlEvent(_newUrl, msg.sender);
    }

    function getUrl() public constant returns (string)
    { return url;}

}