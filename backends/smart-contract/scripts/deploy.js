async function main() {
  const keyboardsContractFactory = await hre.ethers.getContractFactory(
    'Keyboard'
  );
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  console.log('Contract deployed to:', keyboardsContract.address);
  const keyboards = await keyboardsContract.getKeyboards();
  console.log('We got the keyboards!', keyboards);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
