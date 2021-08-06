import React, { useState, useEffect } from "react";
import { AppContext } from "../pages/index.js";

import styled from "styled-components";

import PixelmanRecordHash from "../public/JsonFiles/hash_pman.json";
import WebsiteParamaters from "../public/JsonFiles/website_parameters.json";

const RecordTableContainer = styled.table`
  max-width: 50%;
  margin-top: 20px;
  background-color: #000000;
  border-spacing: 0;
`;

const TableRowHead = styled.tr`
  background-color: #ffffff;
  color: #000000;
`;

const TableRowHeadId = styled.th`
  background-color: #000000;
  color: #ffffff;
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid;
`;

const TableRowHeadHash = styled.th`
  background-color: #000000;
  color: #ffffff;
  text-align: left;
  padding: 10px;
  border-bottom: 2px solid;
`;

const TableRowHeadImageLink = styled.th`
  background-color: #000000;
  color: #ffffff;
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid;
`;

const TableRowElement = styled.tr`
  background-color: #000000;
`;

const TableRowElementId = styled.td`
  background-color: #000000;
  color: #ffffff;
  font-size: 0.85em;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid;
`;

const TableRowElementHash = styled.td`
  background-color: #000000;
  color: #ffffff;
  font-size: 0.85em;
  text-align: left;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid;
`;

const TableRowElementImageLink = styled.td`
  background-color: #000000;
  color: #fa3c6b;
  font-weight: bold;
  font-size: 0.85em;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid;
  border-color: #ffffff;
`;

function RecordTable() {
  const { totalSupply } = React.useContext(AppContext);
  let [recordItems, setRecordItems] = useState([]);

  return (
    <RecordTableContainer>
      <TableRowHead>
        <TableRowHeadId>PIXELMAN ID</TableRowHeadId>
        <TableRowHeadHash>SHA-256 HASH</TableRowHeadHash>
        <TableRowHeadImageLink>IPFS LINK</TableRowHeadImageLink>
      </TableRowHead>
      {useEffect(() => {
        if (totalSupply < 0) return;
        let tempArray = [];

        PixelmanRecordHash;
        for (let i = 0; i < totalSupply; i++) {
          tempArray.push([
            `${i}`,
            PixelmanRecordHash[i],
            `${WebsiteParamaters.NftImageLink}${i}${WebsiteParamaters.NftImageExtension}`,
          ]);
        }

        setRecordItems(
          tempArray.map((value, index) => {
            return (
              <TableRowElement key={index}>
                <TableRowElementId>{value[0]}</TableRowElementId>
                <TableRowElementHash>{value[1]}</TableRowElementHash>
                <TableRowElementImageLink>
                  <a href={value[2]} target="_blank" rel="noreferrer noopener">
                    VIEW
                  </a>
                </TableRowElementImageLink>
              </TableRowElement>
            );
          })
        );
      }, [totalSupply])}
      {recordItems}
    </RecordTableContainer>
  );
}

export default RecordTable;
