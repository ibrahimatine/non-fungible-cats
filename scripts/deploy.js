async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);

  const NappingCats = await ethers.getContractFactory("NappingCats");
  const nappingCats = await NappingCats.deploy("Napping Cats Collection", 10); // Nom et prix initial
  
  await nappingCats.deployed();

  console.log("NappingCats deployed to:", nappingCats.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
