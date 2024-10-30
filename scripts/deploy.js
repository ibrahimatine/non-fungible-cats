const hre = require("hardhat");

async function main() {
  const NappingCats = await hre.ethers.getContractFactory("NappingCats");
  const initialPrice = hre.ethers.utils.parseEther("0.1"); // Prix initial de 0.1 ETH
  const nappingCats = await NappingCats.deploy("Napping Cats", initialPrice);
  
  await nappingCats.deployed();

  console.log("NappingCats deployed to:", nappingCats.address);

  // Modification automatique du fichier scripts.js avec la nouvelle adresse
  const fs = require('fs');
  const path = require('path');
  const scriptsPath = path.join(__dirname, '../public/scripts.js');
  
  let content = fs.readFileSync(scriptsPath, 'utf8');
  content = content.replace(
    /const contractAddress = ".*";/,
    `const contractAddress = "${nappingCats.address}";`
  );
  fs.writeFileSync(scriptsPath, content);

  console.log("Contract address updated in scripts.js");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });