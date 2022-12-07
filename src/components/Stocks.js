import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import _ from "lodash";
import Fuse from "fuse.js";
import Utils from "../utils/Utils";
import ErrorPage from "./Error";
import Loader from "./Loader";

export default function Stocks() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://prototype.sbulltech.com/api/v2/instruments")
      .then(res => {
        setLoading(false);

        let data = Utils.basicCsvToJson(res.data)
        setData(data);
        setFilteredData(data);
      })
  }, [])

  const searchRow = (value) => {
    let matchingData = [];
    if(!_.isEmpty(value)) {
      const fuzzy = new Fuse(data, {
                      keys: ["Name", "Symbol"]
                    });
      matchingData = fuzzy.search(value).map(res => res.item);
    }
    else {
      matchingData = _.assign(data)
    }
    setFilteredData(matchingData)
  }

  let header, body = null;
  if (filteredData.length) {
    header = <tr>{Object.keys(filteredData[0]).map(column => <th key={column}>{column}</th>)}</tr>;
    body = filteredData.map((row) => (
      <tr key={row.Symbol}>
        {Object.values(row).map((dataPt, index) => {
          if(typeof dataPt === "string") {
            let temp = new Date(dataPt + " GMT");
            if(Number.isInteger(Date.parse(temp))) {
              dataPt = temp.toLocaleString("en-IN");
            }
        }
          if(index === 0) {
            return (
                <td key={row.Symbol + dataPt}>
                  <Link to={`/quotes/${dataPt}`} className="link-tag">
                    {dataPt}
                  </Link>
                </td>
              )
          }
          return (<td key={row.Symbol + dataPt}>{dataPt}</td>);
        })}
      </tr>
    ))
  }
  return (
    <div className="stocks-div">
      {
        loading ? (
          <Loader />
        ) : (
          body ? (
            <>
              <div className="input-div">
                <input
                  type="search"
                  onChange={e => searchRow(e.target.value.trim())}
                  placeholder={"Search here"}
                />
              </div>
              <div className="table-div">
                <table>
                  <thead>
                    {header}
                  </thead>
                  <tbody>
                    {body}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <ErrorPage errorMsg="No Data Available at the moment..." />
          )
        )
      }
    </div>
  )
}
