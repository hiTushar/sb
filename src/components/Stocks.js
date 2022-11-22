import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Stocks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://prototype.sbulltech.com/api/v2/instruments")
      .then(res => {
        let data = res.data.trim()
                          .split("\n")
                          .map(str => str.split(","));
        let fields = data[0];
        data = data.slice(1).reduce((json, row) => {
          let rowObj = {};
          fields.forEach((field, index) => {
            rowObj[field] = row[index];
          })
          return json.concat(rowObj)
        }, []);
        setData(data);
      })
  }, [])

  const searchRow = (value) => {
    let matchingData = [];
    // data.slice(1).forEach((row) => {
    //   if()
    // })
  }

  let body, header;
  if (data.length) {
    header = <tr>{Object.keys(data[0]).map(column => <th key={column}>{column}</th>)}</tr>;
    body = data.map((row) => (
      <tr key={row.Symbol}>
        {Object.values(row).map((dataPt, index) => {
          if(index === 0) {
            return (
                <td key={row.Symbol + dataPt}>
                  <Link to={`/quotes/${dataPt}`}>
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
    <div>
      <input
        type="search"
        onChange={e => searchRow(e.target.value)}
        placeholder={"Search..."}
      />
      <table>
        <thead>
          {header}
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
    </div>
  )
}
