// this can be easier with contracts.json

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractsJSON from "../contracts/contracts.json";

const supportedChains = () => {
  const dev =
    process.env.NODE_ENV !== "production"
      ? [parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID, 10)]
      : [];
  return [...dev, parseInt(process.env.REACT_APP_CHAIN_ID, 10)];
};

const useAddresses = (chainId) => {
  const [addresses, setAddresses] = useState();

  useEffect(() => {
    if (chainId === parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID, 10)) {
      setAddresses({
        auctionFactory:
          contractsJSON[1337].ganache.contracts.AuctionFactory.address,
      });
    } else if (chainId === parseInt(process.env.REACT_APP_CHAIN_ID, 10)) {
      // TODO: Update this for other networks
      setAddresses({
        auctionFactory:
          contractsJSON[1337].ganache.contracts.AuctionFactory.address,
      });
    }
  }, [chainId]);

  return addresses;
};

const useContracts = (signer, chainId) => {
  const [contracts, setContracts] = useState();

  useEffect(() => {
    if (signer && signer._isSigner) {
      if (chainId === parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID, 10)) {
        const auctionFactoryContract = new ethers.Contract(
          contractsJSON[1337].ganache.contracts.AuctionFactory.address,
          contractsJSON[1337].ganache.contracts.AuctionFactory.abi,
          signer
        );
        setContracts({ auctionFactory: auctionFactoryContract });
      } else if (chainId === parseInt(process.env.REACT_APP_CHAIN_ID, 10)) {
        // TODO: Update this for other networks
        const auctionFactoryContract = new ethers.Contract(
          contractsJSON[1337].ganache.contracts.AuctionFactory.address,
          contractsJSON[1337].ganache.contracts.AuctionFactory.abi,
          signer
        );
        setContracts({ auctionFactory: auctionFactoryContract });
      }
    }
  }, [signer, chainId]);

  return contracts;
};

export { supportedChains, useAddresses, useContracts };
