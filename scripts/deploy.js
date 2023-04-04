const hre = require("hardhat");

async function main() {

  // Deploy CoastaToken contract
  const COASTATOKEN = await hre.ethers.getContractFactory("CoastaToken");
  const coastatoken = await COASTATOKEN.deploy();
  await coastatoken.deployed();

  console.log(`Coasta ERC20 Token contract deployed with address: ${coastatoken.address}`);

  // Deploy SubPlansToken contract
  
  const SUBPLANSTOKENS = await hre.ethers.getContractFactory("SubPlansTokens");
  const subplanstokens = await SUBPLANSTOKENS.deploy("Essential", "Moderate", "Delux", coastatoken.address);
  await subplanstokens.deployed();

  console.log(`TOKEN Subscription Plans contract deployed with address: ${subplanstokens.address}`);

  // Deploy Coasta contract
  const COASTA = await hre.ethers.getContractFactory("Coasta");
  const coasta = await COASTA.deploy(subplanstokens.address, coastatoken.address);
  await coasta.deployed();

  console.log(`Predicta application contract deployed with address: ${coasta.address}`);

  // Verify CoastaToken contract
  await hre.run("verify:verify", {
    address: coastatoken.address,
    constructorArguments: [],
  });

  // Verify SubPlansToken contract
  await hre.run("verify:verify", {
    address: subplanstokens.address,
    constructorArguments: ["Essential", "Moderate", "Delux", coastatoken.address],
  });

  // Verify Coasta contract
  await hre.run("verify:verify", {
    address: coasta.address,
    constructorArguments: [subplanstokens.address, coastatoken.address],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
