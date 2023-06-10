import { ethers, run } from "hardhat";

async function main() {
  const ContractFactory = await ethers.getContractFactory("Artwork");
  const contract = await ContractFactory.deploy("Artwork Contract", "ART");


  // Wait for the contract to be mined and get the contract's deployed bytecode
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);

  // wait 1 minute for the contract to be mined
  await new Promise((r) => setTimeout(r, 60000));

  // Verify the contract
  try {
    await run("verify:verify", {
      address: contract.address,
      constructorArguments: ["Artwork Contract", "ART"],
    });
    console.log(`Contract verified successfully.`);
  } catch (error) {
    console.error("Failed to verify contract:", error);
  }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
