import Image from "next/image";

import React, { useState, useEffect } from "react";
import { AppContext } from "../pages/index.js";

import styled from "styled-components";

import WebsiteParamaters from "../public/JsonFiles/website_parameters.json";

const LastNftTitle = styled.div`
  color: #ffffff;
  font-size: 1.6em;
  font-weight: bold;
  margin-top: 20px;
`;

const LastNftContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const LastNftText = styled.div`
  margin-top: 10px;
  color: #ffffff;
  font-size: 1em;
  font-weight: bold;

  &:hover {
    opacity: 0.75;
  }
`;

const LastNftGrid = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  width: 85%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: %;
  grid-row-gap: 20px;

  @media (max-width: 1020px) {
    width: 65%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 5%;
    grid-row-gap: 20px;
  }
`;

const LastNftItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
    transition: 0.25s;
  }
`;

function LastNftSection() {
  let [lastNftItems, setLastNftItems] = useState([]);
  const { totalSupply } = React.useContext(AppContext);

  return (
    <LastNftContainer>
      <LastNftTitle>Last 10 Minted</LastNftTitle>
      <LastNftGrid>
        {useEffect(() => {
          if (totalSupply < 0) return;
          let tempArray = [];

          for (let i = totalSupply - 1; i > totalSupply - 1 - 10; i--) {
            tempArray.push([
              `${WebsiteParamaters.NftImageLink}${i}${WebsiteParamaters.NftImageExtension}`,
              `${i}`,
            ]);
          }

          setLastNftItems(
            tempArray.map((value, index) => {
              return (
                <LastNftItem key={index}>
                  <a href={value[0]} target="_blank" rel="noreferrer">
                    <Image
                      className="lastNftItem"
                      width="150px"
                      height="150px"
                      src={value[0]}
                      alt="nft-item"
                    ></Image>
                  </a>
                  <a
                    href={`${WebsiteParamaters.NftOpenseaLink}${value[1]}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LastNftText>{`Check Opensea #${value[1]}`}</LastNftText>
                  </a>
                </LastNftItem>
              );
            })
          );
        }, [totalSupply])}
        {lastNftItems}
      </LastNftGrid>
    </LastNftContainer>
  );
}

export default LastNftSection;
