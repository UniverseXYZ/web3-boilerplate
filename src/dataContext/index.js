import { createContext, useContext } from "react";
import { useWeb3 } from "../web3";
import { useAddresses } from "../web3/chains";

import { useAuctionFactoryContract } from "./contracts";

import { useCurrentBlock, useCurrentTime } from "./time";

import { useMyEtherBalance } from "./balance";

import {
  useTotalAuctions,
  useMaxNumberOfSlotsPerAuction,
  useRoyaltyFeeMantissa,
} from "./auctions";

import { useMyEns } from "./ens";

let context;

const createDataRoot = () => {
  context = createContext();

  context.displayName = "Data Provider";
  const Provider = context.Provider;

  return ({ children }) => {
    const { account, chainId, signerOrProvider, provider } = useWeb3();
    const addresses = useAddresses(chainId);

    const auctionFactoryContract = useAuctionFactoryContract(
      signerOrProvider,
      addresses
    );

    const currentBlock = useCurrentBlock();
    const currentTime = useCurrentTime(currentBlock);

    const myEtherBalance = useMyEtherBalance(account, currentBlock);
    const myEns = useMyEns(account, provider, currentBlock);

    const totalAuctions = useTotalAuctions(auctionFactoryContract);
    const maxNumberOfSlotsPerAuction = useMaxNumberOfSlotsPerAuction(
      auctionFactoryContract
    );
    const royaltyFeeMantissa = useRoyaltyFeeMantissa(auctionFactoryContract);

    const dataContext = {
      auctionFactoryContract,

      currentBlock,
      currentTime,

      myEtherBalance,
      myEns,

      totalAuctions,
      maxNumberOfSlotsPerAuction,
      royaltyFeeMantissa,
    };

    return <Provider value={dataContext}>{children}</Provider>;
  };
};

const DataProvider = createDataRoot();

const useData = () => {
  return useContext(context);
};

export { DataProvider, useData };
