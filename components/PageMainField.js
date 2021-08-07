import Image from "next/image";

import React, { useState, useEffect } from "react";
import { AppContext } from "../pages/index.js";

import styled from "styled-components";

import Web3 from "web3";

import ContractABI from "../public/JsonFiles/contractABI.json";
import WebsiteParamaters from "../public/JsonFiles/website_parameters.json";

import MetamaskButtonDisplay from "./MetamaskButtonDisplay";

import OpenseaLogo from "../public/opensea.png";
import PolygonLogo from "../public/polygon.png";
import TwitterLogo from "../public/twitter-logo.png";

//Intro content
const PageIntro = styled.div`
  min-width: 50%;
  min-height: 803px;

  @media (max-width: 1020px) {
    min-height: 500px;
  }
`;

const PageName = styled.h1`
  background: -webkit-linear-gradient(45deg, #fa3c6b, #67c7d0 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 9vw;
  font-weight: bold;
  line-height: 1.1;
`;

const MintedCounter = styled.div`
  color: #ffffff;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 20px;
`;

const PresentationText = styled.div`
  color: #ffffff;
  width: 90%;
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 20px;
`;

const MarketingText = styled.div`
  color: #ffffff;
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 20px;
`;

const PriceText = styled.div`
  color: #ffffff;
  font-size: 1.6em;
  font-weight: bold;
  margin-top: 20px;
`;

const QuantityText = styled.div`
  color: #ffffff;
  font-size: 1.3em;
  font-weight: bold;
  margin-top: 20px;
`;

const SoldOutText = styled.div`
  color: #ffffff;
  font-size: 1.6em;
  font-weight: bold;
  margin-top: 20px;
`;

const OpenSeaButton = styled.div`
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

const QuantitySelectorContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  height: 45px;
`;

const DecrementQuantityButton = styled.div`
  width: 50px;
  height: 100%;
  background-color: #000000;
  border-right: 4px solid;
  border-top: 4px solid;
  border-bottom: 4px solid;
  border-left: 4px solid;
  border-color: #fa3c6b;
  text-align: center;
  vertical-align: middle;
  color: white;
  user-select: none;

  padding-top: 10px;
  font-size: 0.7em;
  font-weight: 900;

  &:hover {
    cursor: pointer;
    border-color: #67c7d0;
    transition: 0.35s;
  }
`;

const IncrementQuantityButton = styled.div`
  width: 50px;
  height: 100%;
  background-color: #000000;
  border-right: 4px solid;
  border-top: 4px solid;
  border-bottom: 4px solid;
  border-left: 4px solid;
  border-color: #fa3c6b;
  text-align: center;
  vertical-align: middle;
  color: white;
  user-select: none;

  padding-top: 1px;
  font-size: 1.5em;
  font-weight: 900;

  &:hover {
    cursor: pointer;
    border-color: #67c7d0;
    transition: 0.35s;
  }
`;

const QuantityInput = styled.input.attrs({ type: "number" })`
  width: 140px;
  height: 100%;
  background-color: #000000;
  border: 0;
  border-top: 4px solid;
  border-bottom: 4px solid;
  border-color: #fa3c6b;

  color: white;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;

  &:hover {
    cursor: pointer;
    border-color: #67c7d0;
    transition: 0.35s;
  }
`;

const MintNFTButton = styled.div`
  background-color: #000000;
  border: 4px solid;
  color: #fa3c6b;
  border-color: #fa3c6b;
  margin-top: 20px;
  padding: 0.8em 1em;
  width: 15em;

  font-size: 1em;
  font-weight: bold;
  text-align: center;
  transition: 0.35s;

  &:hover {
    cursor: pointer;
    border-color: #67c7d0;
    color: #67c7d0;
    transition: 0.35s;
  }
`;

const SocialsContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
`;

const socialImages = [
  [TwitterLogo, WebsiteParamaters.TwitterLink],
  [PolygonLogo, WebsiteParamaters.PolygonscanLink],
  [OpenseaLogo, WebsiteParamaters.OpenseaLink],
];

const SocialImage = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  transition: 0.25s;

  &:hover {
    opacity: 0.7;
    transition: 0.25s;
  }
`;

function PageMainField() {
  let [maxMintedAmount, setMaxMintedAmount] = useState(-1);
  let [quantity, setQuantity] = useState(1);

  const {
    totalSupply,
    isConnected,
    setConnectedState,
    isRightNetwork,
    setIsRightNetwork,
    accountAddress,
    setModalTxHash,
    setMintModalEnabled,
  } = React.useContext(AppContext);

  function updateInputValue(event) {
    setQuantity(event.target.value);
  }

  useEffect(() => {
    if (quantity > 20) {
      setQuantity(20);
    } else if (quantity < 1) {
      setQuantity(1);
    }
  }, [quantity]);

  function increment() {
    setQuantity(
      quantity < 20 &&
        parseInt(totalSupply) + parseInt(quantity) < maxMintedAmount
        ? ++quantity
        : quantity
    );
  }

  function decrement() {
    setQuantity(quantity > 1 ? --quantity : quantity);
  }

  const checkBlockchainData = async () => {
    if (typeof web3 !== "undefined") {
      try {
        window.web3 = new Web3(window.web3.currentProvider);

        const networkId = await window.web3.eth.net.getId();
        setIsRightNetwork(
          networkId == WebsiteParamaters.NetworkId ? true : false
        );

        const accounts = await window.web3.eth.getAccounts();
        setConnectedState(accounts.length > 0);
      } catch (err) {
        console.log(err);
      }
    } else {
      setConnectedState(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkBlockchainData();
    }, 1000);
    return () => clearInterval(interval);
  });

  const getMaxMintedAmount = async () => {
    try {
      if (!isRightNetwork) return;
      window.web3 = new Web3(window.web3.currentProvider);

      const contract = new window.web3.eth.Contract(
        ContractABI,
        WebsiteParamaters.ContractAddress
      );

      setMaxMintedAmount(await contract.methods.MAX_TOKENS().call());
    } catch (err) {
      console.log(err);
    }
  };
  getMaxMintedAmount();

  const mintNft = async () => {
    try {
      if (!isRightNetwork) return;
      window.web3 = new Web3(window.web3.currentProvider);

      const contract = new window.web3.eth.Contract(
        ContractABI,
        WebsiteParamaters.ContractAddress
      );

      const nftFixedPrice = 1;
      await contract.methods
        .mint(quantity)
        .send({
          from: `${accountAddress}`,
          value: (quantity * nftFixedPrice * 10 ** 18).toString(),
        })
        .on("receipt", (events) => {
          setModalTxHash(events.transactionHash);
          setMintModalEnabled(true);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageIntro>
      <PageName>PixelMan NFT&apos;s</PageName>
      <PresentationText>
        PixelMan is a collection of NFTs - unique digital collectibles, swimming
        on the Ethereum Blockchain. 3350 pixelmens have been programmatically
        generated from a large amount of combinations, each with unique
        characteristics and different traits.
      </PresentationText>
      <MarketingText>
        Own a PixelMan and raise the crypto revolution.
      </MarketingText>
      {(() => {
        if ((totalSupply == -1 || maxMintedAmount == -1) && isRightNetwork)
          return;
        if (isConnected) {
          if (isRightNetwork) {
            if (parseInt(totalSupply) < parseInt(maxMintedAmount)) {
              return (
                <div>
                  <MintedCounter>
                    {(() => {
                      if (totalSupply == -1 || maxMintedAmount == -1) {
                        return "0/0 minted";
                      } else {
                        return `${totalSupply}/${maxMintedAmount} Minted`;
                      }
                    })()}
                  </MintedCounter>
                  <MetamaskButtonDisplay />
                  <PriceText>{`Price : ${WebsiteParamaters.NftUnitPrice} ${WebsiteParamaters.CurrencyName}`}</PriceText>
                  <QuantityText>Quantity</QuantityText>
                  <QuantitySelectorContainer>
                    <DecrementQuantityButton onClick={decrement}>
                      &mdash;
                    </DecrementQuantityButton>
                    <QuantityInput
                      value={quantity}
                      onChange={updateInputValue}
                    />
                    <IncrementQuantityButton onClick={increment}>
                      &#xff0b;
                    </IncrementQuantityButton>
                  </QuantitySelectorContainer>
                  <MintNFTButton onClick={mintNft}>MINT</MintNFTButton>
                </div>
              );
            } else {
              return (
                <div>
                  <MintedCounter>
                    {(() => {
                      if (totalSupply == -1 || maxMintedAmount == -1) {
                        return "0/0 minted";
                      } else {
                        return `${totalSupply}/${maxMintedAmount} Minted`;
                      }
                    })()}
                  </MintedCounter>
                  <SoldOutText>SOLD OUT</SoldOutText>
                  <OpenSeaButton>Buy on OpenSea</OpenSeaButton>);
                </div>
              );
            }
          } else {
            return <MetamaskButtonDisplay />;
          }
        } else {
          return <MetamaskButtonDisplay />;
        }
      })()}
      <SocialsContainer>
        {socialImages.map((value, index) => {
          return (
            <SocialImage key={index}>
              <a href={value[1]} target="_blank" rel="noreferrer noopener">
                <Image className="socialImage" src={value[0]} alt="nft-item" />
              </a>
            </SocialImage>
          );
        })}
      </SocialsContainer>
    </PageIntro>
  );
}

export default PageMainField;
