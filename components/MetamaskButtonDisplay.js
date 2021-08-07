import React, { useEffect } from "react";
import { AppContext } from "../pages/index.js";

//Blockchain
import Web3 from "web3";

import WebsiteParamaters from "../public/JsonFiles/website_parameters.json";

import styled from "styled-components";

const MetamaskConnectButton = styled.div`
  background-color: #fa3c6b;
  margin-top: 20px;
  padding: 0.8em 1em;
  border-radius: 30px;
  width: 15em;

  color: #ffffff;
  font-size: 1em;
  font-weight: bold;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: #67c7d0;
    transition: 0.35s;
  }
`;

const WrongNetworkButton = styled.div`
  background-color: #000000;
  margin-top: 20px;
  padding: 0.8em 1em;
  border: 4px solid #ff4848;
  width: 23em;

  color: #ff4848;
  font-size: 1em;
  font-weight: bold;
  text-align: center;

  &:hover {
    cursor: pointer;
    transition: 0.35s;
  }
`;

const RightNetworkButton = styled.div`
  background-color: #000000;
  margin-top: 20px;
  padding: 0.8em 1em;
  border: 4px solid #67c7d0;
  width: 15em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  color: #67c7d0;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  transition: 0.5s;

  &:hover {
    opacity: 0.8;
    transition: 0.5s;
  }
`;

function MetamaskButtonDisplay() {
  const { isConnected, setAccountAddress, isRightNetwork } =
    React.useContext(AppContext);

  const connectToWallet = async () => {
    if (typeof web3 !== "undefined") {
      try {
        window.web3 = new Web3(window.web3.currentProvider);
        await window.ethereum.enable();

        const accounts = await window.web3.eth.getAccounts();
        setAccountAddress(accounts[0]);
      } catch (err) {
        console.log(err);
      }
    }
  };
  connectToWallet();

  if (isConnected) {
    return isRightNetwork ? (
      <RightNetworkButton>Connected to Matic</RightNetworkButton>
    ) : (
      <WrongNetworkButton>{`Wrong Network, Connect to ${WebsiteParamaters.NetworkName}`}</WrongNetworkButton>
    );
  } else {
    return (
      <MetamaskConnectButton onClick={connectToWallet}>
        Connect on Metamask
      </MetamaskConnectButton>
    );
  }
}

export default MetamaskButtonDisplay;
