import { useState, useEffect } from "react";
import { Contract } from "ethers";

const useAuctionFactoryContract = (provider, addresses) => {
  const [auctionFactoryContract, setAuctionFactoryContract] = useState(null);

  useEffect(() => {
    if (!provider || !addresses) return;

    setAuctionFactoryContract(
      new Contract(
        addresses.auctionFactory.address,
        addresses.auctionFactory.abi,
        provider
      )
    );
  }, [addresses, provider]);

  return auctionFactoryContract;
};

export { useAuctionFactoryContract };
