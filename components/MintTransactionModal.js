import Image from "next/image";

import React from "react";
import { AppContext } from "../pages/index.js";

import styled from "styled-components";

import WebsiteParamaters from "../public/JsonFiles/website_parameters.json";

import Checkmark from "../public/checkmark.png";
import Cross from "../public/cross.png";
import RightArrow from "../public/right-arrow.png";

const ModalBackground = styled.div`
  display: ${(props) => (props.state ? "flex" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 570px;
  height: 375px;
  background-color: #2d2d2d;
  box-shadow: 3px 3px 10px black;
  border-radius: 15px;
`;

const CloseButtonIconContainer = styled.div`
  position: absolute;
  margin: 20px 20px 0px 0px;
  top: 0;
  right: 0;
  opacity: 0.35;

  &:hover {
    cursor: pointer;
    opacity: 0.2;
    transition: 0.35s;
  }
`;

const ModalIconContainer = styled.div`
  width: 120px;
  height: 120px;
  filter: invert(47%) sepia(74%) saturate(793%) hue-rotate(194deg)
    brightness(95%) contrast(110%);
  user-select: none;
`;

const SuccessfulText = styled.div`
  color: #ffffff;
  font-size: 1.3em;
  font-weight: bold;
  margin-top: 20px;
  user-select: none;
`;

const TransactionHashText = styled.div`
  color: #ffffff;
  font-size: 0.75em;
  font-weight: bold;
  margin-top: 20px;
`;

const OpenseaModalButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 15em;
  height: 3em;
  margin-top: 35px;
  padding: 0.8em 1em;
  background-color: #5189fd;
  border-radius: 30px;
  transition: 0.35s;

  &:hover {
    cursor: pointer;
    opacity: 0.75;
    transition: 0.35s;
  }
`;

const OpenseaModalButtonText = styled.p`
  font-weight: 700;
  color: #ffffff;
`;

const RightArrowImageContainer = styled.div`
  display: flex;
  width: 20px;
  margin-left: 10px;
  padding-top: 4px;
  height: 40px;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

function MintTransactionModal() {
  const { mintModalEnabled, setMintModalEnabled, modalTxHash } =
    React.useContext(AppContext);

  return (
    <ModalBackground state={mintModalEnabled}>
      <ModalContainer>
        <ModalIconContainer>
          <Image
            className="modal-icon"
            width="120px"
            height="120px"
            layout="fixed"
            src={Checkmark}
            alt="modal-icon"
          ></Image>
        </ModalIconContainer>
        <SuccessfulText>Transaction success !</SuccessfulText>
        <TransactionHashText>TxHash : {modalTxHash}</TransactionHashText>
        <OpenseaModalButton
          onClick={() =>
            window.open(WebsiteParamaters.NftStorageOpensea, "_blank")
          }
        >
          <OpenseaModalButtonText>Check on OpenSea</OpenseaModalButtonText>
          <RightArrowImageContainer>
            <Image width="20px" height="20px" src={RightArrow}></Image>
          </RightArrowImageContainer>
        </OpenseaModalButton>
        <CloseButtonIconContainer onClick={() => setMintModalEnabled(false)}>
          <Image width="15px" height="15px" src={Cross}></Image>
        </CloseButtonIconContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default MintTransactionModal;
