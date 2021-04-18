import React from "react";
import { useContracts } from "../hooks/chains";
import { useProvider, connect, logout } from "../hooks/useProviders";

export const Welcome = () => {
  const provider = useProvider();
  const contracts = useContracts(provider.signerOrProvider, provider.chainId);

  const login = async () => {
    await connect();
  };
  const signout = async () => {
    await logout();
    window.location.reload();
  };
  const doSomething = async () => {
    const { auctionFactory } = contracts;
    alert(
      `Total Number of Auctions of Contract: ${
        auctionFactory.address
      }, ${await auctionFactory.totalAuctions()}`
    );
    console.log(auctionFactory);
  };

  return (
    <div>
      {!contracts ? (
        <button onClick={login}>Connect Account</button>
      ) : (
        <>
          <button onClick={doSomething}>Do Something</button>
          <button onClick={signout}>Logout</button>
        </>
      )}
    </div>
  );
};
