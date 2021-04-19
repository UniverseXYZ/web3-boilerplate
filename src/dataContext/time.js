import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import { useWeb3 } from "../web3";

function useCurrentBlock() {
  const [currentBlock, setCurrentBlock] = useState(BigNumber.from(0));
  const { provider } = useWeb3();

  useEffect(() => {
    if (!provider) return;

    provider
      .getBlockNumber()
      .then((blockNumber) => {
        setCurrentBlock(BigNumber.from(blockNumber));
      })
      .catch(console.error);

    const getBlockNumber = (blockNumber) => {
      setCurrentBlock(BigNumber.from(blockNumber));
    };

    provider.on("block", getBlockNumber);

    return () => {
      provider.removeListener("block", getBlockNumber);
    };
  }, [provider]);

  return currentBlock;
}

function useCurrentTime(blockNumber) {
  const [currentTime, setCurrentTime] = useState(
    BigNumber.from(Math.floor(Date.now() / 1000))
  );
  const { provider } = useWeb3();

  useEffect(() => {
    if (!provider || blockNumber.eq(0)) return;

    provider
      .getBlock(blockNumber.toNumber())
      .then((block) => {
        if (block) {
          setCurrentTime(BigNumber.from(block.timestamp));
        }
      })
      .catch(console.error);

    const timer = setInterval(() => {
      setCurrentTime((currentTime) => currentTime.add(BigNumber.from(1)));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [provider, blockNumber]);

  return currentTime;
}

export { useCurrentBlock, useCurrentTime };
