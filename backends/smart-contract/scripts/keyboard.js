async function main() {
  const [owner, anotherOwner] = await hre.ethers.getSigners();
  const keyboardsContractFactory = await hre.ethers.getContractFactory(
    'Keyboard'
  );
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  console.log('Contract deployed to:', keyboardsContract.address);

  const keyboardTxn1 = await keyboardsContract.create(0, true, 'hue-rotate-90');
  await keyboardTxn1.wait();

  const keyboardTxn2 = await keyboardsContract
    .connect(anotherOwner)
    .create(1, false, 'grayscale');
  await keyboardTxn2.wait();

  const balanceBefore = await hre.ethers.provider.getBalance(
    anotherOwner.address
  );
  console.log(
    'anotherOwner balance before!',
    hre.ethers.utils.formatEther(balanceBefore)
  );

  const tipTxn = await keyboardsContract.tip(1, {
    value: hre.ethers.utils.parseEther('1000'),
  }); // tip the 2nd keyboard as owner!
  await tipTxn.wait();

  const balanceAfter = await hre.ethers.provider.getBalance(
    anotherOwner.address
  );
  console.log(
    'anotherOwner balance after!',
    hre.ethers.utils.formatEther(balanceAfter)
  );

  const keyboards = await keyboardsContract.getKeyboards();
  console.log('We got the keyboards!', keyboards);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
