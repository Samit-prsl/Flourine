import  hre  from "hardhat";

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = ethers.parseEther("0.001");

  // const Flourine = await ethers.deployContract("Flourine", [unlockTime], {
  //   value: lockedAmount,
  // });

  // await Flourine.waitForDeployment();
  const Flourine = await hre.ethers.getContractFactory("Flourine");
  const flourine = await Flourine.deploy();

  await flourine.deploymentTransaction()?.wait(1);
  console.log("Flourine deployed to:", flourine.deploymentTransaction());
  // console.log(
  //   `Lock with ${ethers.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${Flourine.target}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

