//Next
import Image from "next/image";
import Head from "next/head";

//React
import React, { useState, useEffect } from "react";
import styled from "styled-components";

//Blockchain
import Web3 from "web3";
import ContractABI from "../public/JsonFiles/contractABI.json";

//Components
import RecordTable from "../components/RecordTable";
import PageMainField from "../components/PageMainField";
import LastNftSection from "../components/LastNftSection";
import MintTransactionModal from "../components/MintTransactionModal";

import PixelmanArtGif from "../public/pman.gif";

export const AppContext = React.createContext();

export default function Home() {
  const PageContainer = styled.div`
    margin: 70px 0px 70px 0px;
    width: 85%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  `;

  const IntroContainer = styled.div`
    display: flex;
    flex-directon: row;
    justify-content: space-between;
    align-items: top;
  `;

  // Intro art
  const PageIntroArt = styled.div`
    min-width: 50%;
    display: flex;
    display: block;

    @media (max-width: 1020px) {
      display: none;
    }
  `;

  const ArtImg = styled.div`
    margin-left: 10%;
    width: 85%;
    height: 85%;
  `;

  //Page body
  const PageBody = styled.div``;

  const ProvenanceText = styled.div`
    color: #ffffff;
    font-size: 1.6em;
    font-weight: bold;
    margin-top: 20px;
  `;

  const SmallTitle = styled.div`
    color: #fad121;
    font-size: 1.3em;
    font-weight: bold;
    margin-top: 20px;
  `;

  const HashSection = styled.div`
    display: none;
  `;

  const TextAreaContainer = styled.div`
    resize: vertical;
  `;

  const BasicWhiteText = styled.div`
    color: #ffffff;
    font-size: 1.1em;
    font-weight: bold;
    margin-top: 20px;
  `;

  const TextArea = styled.textarea`
    margin-top: 20px;
    width: 100%;
    min-height: 150px;
    resize: vertical;
    background-color: black;
    color: #999999;
    font-weight: bold;
    value: "5b67943364b90f673481c8912193aee0dd33ec7b91c81870b2b4e637e0a792e2db10c637b20edffd7f4388e70a454726db1d7ebb078cc7eec05d9f9a0683c0ae764b4ccf269f98ed5ec0d8f5f1d79762f346f0a1a361dadd0b7c4604e59b538ec18ee96d4da18294ce516aea16d0631e0c51180ffafbd9d7ea90db19f6fee836312742faa83d2d12d1ac724dc7788a0ed9b8e5f666d99f64bf7b662a2bab5e3a629772a654ab4cb3d1a0e1c06ca18962e8e54e2a33ae35ed8b5008119f8c1e4e1444b33c589e90c900a9bf36545a7cb6d36732080e5bdb3301741e399f14c0a4411d95ed9c255a666d3d966e97546ad1d60b8c2fe673dcb4a30feeb417338c10aa44e530c45c0e9935bebf4f70cf98b7c9b72a424c464d110c7cf38f7f9867b03e97064cda883a32d0645980c042c1c0213048a1570c843a3cd2";
  `;

  const ContractLink = styled.a.attrs({
    href: `https://polygonscan.com/address/0x14b22925305e60e0707aaa1319af09f4d2f1e646`,
    target: `_blank`,
    rel: `noreferrer`,
  })`
    color: #fa3c6b;
    margin-left: 5px;
    transition: 0.25s;
    text-decoration: none;

    &:hover {
      opacity: 0.75;
      transition: 0.25s;
    }
  `;

  //Logic
  let [isConnected, setConnectedState] = useState(false);
  let [accountAddress, setAccountAddress] = useState("");
  let [isRightNetwork, setIsRightNetwork] = useState(false);
  let [totalSupply, setTotalSupply] = useState(-1);
  let [mintModalEnabled, setMintModalEnabled] = useState(false);
  let [modalTxHash, setModalTxHash] = useState("");

  const nftSupply = async () => {
    try {
      if (isRightNetwork && isConnected) {
        const contract = new window.web3.eth.Contract(
          ContractABI,
          "0x14b22925305E60e0707Aaa1319aF09F4d2f1E646"
        );

        setTotalSupply(await contract.methods.totalSupply().call());
      }
    } catch (err) {
      console.log(err);
    }
  };
  nftSupply();

  const propsTest = {
    totalSupply,
    isConnected,
    setConnectedState,
    setAccountAddress,
    isRightNetwork,
    setIsRightNetwork,
    accountAddress,
    mintModalEnabled,
    modalTxHash,
    setModalTxHash,
    setMintModalEnabled,
  };

  return (
    <AppContext.Provider value={propsTest}>
      <div className="base">
        <Head>
          <title>PixelMan NFT&apos;s</title>
          <link rel="shortcut icon" href="/pixel_man.ico" />
        </Head>
        <PageContainer>
          <IntroContainer>
            <PageMainField />
            <PageIntroArt>
              <ArtImg>
                <Image
                  className="introImage"
                  src={PixelmanArtGif}
                  alt="nft-item"
                />
              </ArtImg>
            </PageIntroArt>
          </IntroContainer>
          <PageBody>
            <LastNftSection />
            <ProvenanceText>PROVENANCE RECORD</ProvenanceText>
            <SmallTitle>Contract Detail</SmallTitle>
            <BasicWhiteText>
              Contract |
              <ContractLink>
                0x14b22925305e60e0707aaa1319af09f4d2f1e646
              </ContractLink>
            </BasicWhiteText>
            <HashSection>
              <BasicWhiteText>
                Final Proof Hash |
                8b941d8e038d49895ad2635b2ad1ebf4776793490cfde977f17c8c57d4d665ff
              </BasicWhiteText>
              <SmallTitle>Concatenated Hash String</SmallTitle>
              <TextAreaContainer>
                <TextArea />
              </TextAreaContainer>
            </HashSection>
            <SmallTitle>PixelMan Record</SmallTitle>
            <RecordTable />
          </PageBody>
          <MintTransactionModal />
        </PageContainer>
      </div>
    </AppContext.Provider>
  );
}
