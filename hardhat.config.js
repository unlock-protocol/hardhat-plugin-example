require("@unlock-protocol/hardhat-plugin");

task('lock:info', "Prints some info about a lock")
  .addParam('lockAddress', "The lock address")
  .setAction(async ({ lockAddress }, { ethers, unlock }) => {
    
    if (!lockAddress) {
      throw new Error('LOCK BALANCE > Missing lock address.')
    }

    // get lock instance
    const lock = await unlock.getLock(lockAddress)

    // eslint-disable-next-line no-console
    console.log(
      `LOCK '${await lock.name()}' \n`,
      ` - keys: ${await lock.totalSupply()} / ${await lock.maxNumberOfKeys()} \n`,
      ` - owners: ${await lock.numberOfOwners()} \n`,
      ` - symbol: ${await lock.symbol()} \n`,
      ` - balance: ${ethers.utils.formatUnits(await ethers.provider.getBalance(lock.address), 18)}`,
      ` - version: ${await lock.publicLockVersion()} /n`
    )

  })

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};
