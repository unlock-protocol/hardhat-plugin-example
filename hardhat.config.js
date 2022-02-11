require("@unlock-protocol/hardhat-plugin");

task('lock:info', "Prints some info about a lock")
  .addParam('lockAddress', "The lock address")
  .setAction(async ({ lockAddress }, { ethers, unlock }) => {
    
    if (!lockAddress) {
      throw new Error('LOCK BALANCE > Missing lock address.')
    }

    // get lock instance
    const lock = await unlock.getLock(lockAddress)

    // fetch potential ERC20 token address
    const tokenAddress = await lock.tokenAddress()
    
    console.log(
      `LOCK \n`,
      ` - name: '${await lock.name()}' \n`,
      ` - address: ${lock.address} \n`,
      ` - keys: ${await lock.totalSupply()} / ${await lock.maxNumberOfKeys()} \n`,
      ` - owners: ${await lock.numberOfOwners()} \n`,
      ` - currency: ${tokenAddress === ethers.constants.AddressZero ? 'ETH' : tokenAddress } \n`,
      ` - balance: ${ethers.utils.formatUnits(await ethers.provider.getBalance(lock.address), 18)} \n`,
      ` - symbol: ${await lock.symbol()} \n`,
      ` - version: ${await lock.publicLockVersion()}`
    )

  })

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.7",
    optimizer: {
      enabled: true,
      runs: 200,
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // needed to deploy the contracts protocol locally
      gas: 1000000000,
      allowUnlimitedContractSize: true,
      blockGasLimit: 1000000000,
    }
  }
};
