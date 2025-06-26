import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployBlockMagicians: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("BlockMagicians", {
    from: deployer,
    // Contract constructor arguments
    // args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const blockMagicians = await hre.ethers.getContract<Contract>("BlockMagicians", deployer);
  await blockMagicians.transferOwnership("0x4b2b0D5eE2857fF41B40e3820cDfAc8A9cA60d9f");
};

export default deployBlockMagicians;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployBlockMagicians.tags = ["BlockMagicians"];
