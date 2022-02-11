const { ethers, unlock } = require('hardhat')
const { constants, utils } = ethers

// create sample data
const lockParams = {
  expirationDuration: 60 * 60 * 24 * 30, // 30 days
  currencyContractAddress: constants.AddressZero, // address 0 is ETH but could be any ERC20 token
  keyPrice: utils.parseEther('.001').toNumber(), // in wei
  maxNumberOfKeys: 100,
  name: 'Unlock-Protocol Sample Lock',
}

async function main() {

  // eslint-disable-next-line no-console
  console.log(
    `LOCK SAMPLE > Deploying the Unlock Protocol contracts...`
  )

  // deploy the Unlock conctrats
  await unlock.deployProtocol()

  // deploy demo locks  
  const {lock: newLock} = await unlock.createLock(lockParams)
  
  // eslint-disable-next-line no-console
  console.log(
    `LOCK SAMPLE > New lock deployed to: ${newLock.address}`
  )

  // eslint-disable-next-line no-console
  console.log('LOCK SAMPLE > Now lets buy a bunch of keys...')

  // purchase a bunch of keys
  const { keyPrice } = lockParams
  const purchasers = await ethers.getSigners()
  const txs = await Promise.all(
    purchasers.map((purchaser) =>
      newLock
        .connect(purchaser)
        .purchase(
          keyPrice,
          purchaser.address,
          constants.AddressZero,
          constants.AddressZero,
          [],
          { value: keyPrice }
        )
    )
  )

  const purchases = await Promise.all(txs.map((tx) => tx.wait()))
  purchases
    .map(({ events }) => events.find(({ event }) => event === 'Transfer'))
    .forEach(({ args: { to, tokenId } }) => {
      // eslint-disable-next-line no-console
      console.log(`LOCK SAMPLE > key (${tokenId}) purchased by ${to}`)
    })
}

// execute as standalone
if (require.main === module) {
  /* eslint-disable promise/prefer-await-to-then, no-console */
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

module.exports = main
