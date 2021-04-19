import { useState, useEffect } from "react";

function useTotalAuctions(auctionFactory) {
  const [totalAuctions, setTotalAuctions] = useState(null);

  useEffect(() => {
    if (!auctionFactory) return;

    auctionFactory.totalAuctions().then(setTotalAuctions).catch(console.error);
  }, [auctionFactory]);

  return totalAuctions;
}

function useMaxNumberOfSlotsPerAuction(auctionFactory) {
  const [maxNumberOfSlotsPerAuction, setMaxNumberOfSlotsPerAuction] = useState(
    null
  );

  useEffect(() => {
    if (!auctionFactory) return;

    auctionFactory
      .maxNumberOfSlotsPerAuction()
      .then(setMaxNumberOfSlotsPerAuction)
      .catch(console.error);
  }, [auctionFactory]);

  return maxNumberOfSlotsPerAuction;
}

function useRoyaltyFeeMantissa(auctionFactory) {
  const [royaltyFeeMantissa, setRoyaltyFeeMantissa] = useState(null);

  useEffect(() => {
    if (!auctionFactory) return;

    auctionFactory
      .royaltyFeeMantissa()
      .then(setRoyaltyFeeMantissa)
      .catch(console.error);
  }, [auctionFactory]);

  return royaltyFeeMantissa;
}

function useAuctions(auctionFactory, auctionId) {
  const [auctions, setAuctions] = useState(null);

  useEffect(() => {
    if (!auctionFactory || auctionId.eq(0)) return;

    auctionFactory.auctions(auctionId).then(setAuctions).catch(console.error);
  }, [auctionFactory, auctionId]);

  return auctions;
}

function useAuctionsRevenue(auctionFactory, auctionId) {
  const [auctionsRevenue, setAuctionsRevenue] = useState(null);

  useEffect(() => {
    if (!auctionFactory || auctionId.eq(0)) return;

    auctionFactory
      .auctionsRevenue(auctionId)
      .then(setAuctionsRevenue)
      .catch(console.error);
  }, [auctionFactory, auctionId]);

  return auctionsRevenue;
}

function useRoyaltiesReserve(auctionFactory, auctionId) {
  const [royaltiesReserve, setRoyaltiesReserve] = useState(null);

  useEffect(() => {
    if (!auctionFactory || auctionId.eq(0)) return;

    auctionFactory
      .royaltiesReserve(auctionId)
      .then(setRoyaltiesReserve)
      .catch(console.error);
  }, [auctionFactory, auctionId]);

  return royaltiesReserve;
}

function useCreateAuction(
  auctionFactory,
  startBlockNumber,
  endBlockNumber,
  resetTimer,
  numberOfSlots,
  supportsWhitelist,
  bidToken
) {
  const [createAuction, setCreateAuction] = useState(null);

  useEffect(() => {
    if (
      !auctionFactory ||
      startBlockNumber.eq(0) ||
      endBlockNumber.eq(0) ||
      resetTimer.eq(0) ||
      numberOfSlots.eq(0) ||
      bidToken.eq(0)
    )
      return;

    auctionFactory
      .createAuction(
        auctionFactory,
        startBlockNumber,
        endBlockNumber,
        resetTimer,
        numberOfSlots,
        supportsWhitelist,
        bidToken
      )
      .then(setCreateAuction)
      .catch(console.error);
  }, [
    auctionFactory,
    startBlockNumber,
    endBlockNumber,
    resetTimer,
    numberOfSlots,
    supportsWhitelist,
    bidToken,
  ]);

  return createAuction;
}

export {
  useTotalAuctions,
  useMaxNumberOfSlotsPerAuction,
  useRoyaltyFeeMantissa,
  useAuctions,
  useAuctionsRevenue,
  useRoyaltiesReserve,
  useCreateAuction,
};
