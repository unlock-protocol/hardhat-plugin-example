# Unlock Hardhat Plugin Sample Project

This project demonstrates a basic use case for Hardhat Unlock. 

## How to use 

1. install deps with `yarn` or `npm i`
2. add your RPC endpoint to the `hardhat.config.js` (as [explained here](https://hardhat.org/config/))
3. from your terminal, try running the following (with the address of your lock):

```shell
npx hardhat lock:info --lock-address <your-lock-address> --network mainnet
```

### Test locally

Create a lock and buy a bunch of keys

```
yarn hardhat run scripts/createSampleLock.js
```

