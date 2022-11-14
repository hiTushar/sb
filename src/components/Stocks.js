import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Stocks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://prototype.sbulltech.com/api/v2/instruments")
      .then(res => {
        let data = res.data.split("\n").map(str => str.split(","));
        setData(data);
      })
  }, [])

  let body, header;
  if (data.length) {
    header = <tr>{data[0].map(column => <th>{column}</th>)}</tr>;
    body = data.slice(1)
      .reduce((allRows, row) => {
        allRows.push(
            <tr>
              {row.map((column, index) => {
                  if(index === 0) {
                    return (
                        <td>
                          <Link to={`/quotes/${column}`}>
                            {column}
                          </Link>
                        </td>
                      )
                  }
                  return (<td>{column}</td>);
                })}
            </tr>
        );
        return allRows;
      }, []);
  }
  return (
    <div>
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
