// this can be easier with contracts.json

import { useState, useEffect } from "react";
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
        auctionFactory: {
          address: contractsJSON[1337].ganache.contracts.AuctionFactory.address,
          abi: contractsJSON[1337].ganache.contracts.AuctionFactory.abi,
        },
      });
    } else if (chainId === parseInt(process.env.REACT_APP_CHAIN_ID, 10)) {
      // TODO: Update this for other networks
      setAddresses({
        auctionFactory: {
          address: contractsJSON[1337].ganache.contracts.AuctionFactory.address,
          abi: contractsJSON[1337].ganache.contracts.AuctionFactory.abi,
        },
      });
    }
  }, [chainId]);

  return addresses;
};

export { supportedChains, useAddresses };
