import React from "react";
import { connect, logout } from "../web3/useProviders";
import { useData } from "../dataContext";
import { useProvider } from "../web3/useProviders";

export const Welcome = () => {
  const data = useData();
  const provider = useProvider();

  const login = async () => {
    await connect();
  };
  const signout = async () => {
    await logout();
    window.location.reload();
  };

  const doSomething = async () => {
    const { totalAuctions, auctionFactoryContract } = data;

    alert(
      `Total Number of Auctions of Contract: ${auctionFactoryContract.address}, ${totalAuctions}`
    );
  };

  return (
    <div>
      {!provider.account ? (
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
