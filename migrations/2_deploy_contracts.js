var Users = artifacts.require("./Users.sol");
var Cards = artifacts.require("./Cards.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(Cards);
};
