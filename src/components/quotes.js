import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import _ from "lodash";
import caution from "../assets/triangle-caution-yellow-sign-icon-free-vector.jpg"
import ErrorPage from "./Error";

export default function Quotes() {
    const [data, setData] = useState([]);
    const [order, setOrder] = useState("asc");

    let { stockId } = useParams();
    useEffect(() => {
        getData(`https://prototype.sbulltech.com/api/v2/quotes/${stockId}`);
    }, []);

    useEffect(() => {
        let newData = sortData(order, data, 'time')
        setData(newData);
    }, [order])

    const getData = (url) => {
        axios.get(url)
            .then(res => {
                if(res.data.success) {
                    let newData = sortData(order, res.data.payload[stockId], 'time');
                    setData(newData);
    
                    newData = sortData("asc", res.data.payload[stockId], "valid_till");
                    let closestTime = newData[0].valid_till + " GMT";
    
                    let currentTimeString = new Date(Date.now());
                    currentTimeString = currentTimeString.toUTCString()
    
                    let duration = (Date.parse(closestTime)) - Date.parse(currentTimeString);
    
                    if(duration < 0) {
                        duration = 5000; // duration will come as -ve when the current expired price is still present in the response (API issue). 
                                                      // adding a default timeout for refresh for such case.
                        console.log("expired price point still present!!");
                    }
                    setTimeout(() => {
                        window.location.reload(true);
                    }, duration);
                }
                else {
                    setData(res.data.err_msg);
                }
            })
    }

    const sortData = (order, data, field) => {
        return _.orderBy(data, [field], [order]);
    }

    const toggleOrder = () => {
        setOrder(order === "asc" ? "desc" : "asc");
    }

    let header, body = null;
    if(_.isArray(data) && data.length) {
        header = <tr>
                    {Object.keys(data[0]).map(column => {
                        let sort = false;
                        if(column === "time") {
                            sort = true;
                        }
                        return (
                            <th key={column} className={sort ? "column-sort" : ""}>
                                {column}
                                {sort 
                                    ? <div>
                                        <button onClick={toggleOrder}>{order === "asc" ? "desc" : "asc"}</button>
                                      </div>
                                    : <></>
                                }
                            </th>
                        )
                    })}
                </tr>
        body = data.map(row => <tr key={row.price + Date.parse(row.time)}>
                                {Object.values(row).map(val => {
                                    if(typeof val === "string") {
                                        let temp = new Date(val + " GMT");
                                        if(Number.isInteger(Date.parse(temp))) {
                                            val = temp.toLocaleString("en-IN");
                                        }
                                    }
                                    return (
                                        <td key={val}>
                                            {val}
                                        </td>
                                    )
                                })}
                               </tr>);
    }
    
    return (
        <div className="quotes-div">
            {
                body ? (
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
                ) : (
                    <ErrorPage errorMsg={data} />
                )
            }
        </div>
    )
}