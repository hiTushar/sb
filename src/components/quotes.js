import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Quotes() {
    console.log("inside quotes");
    const [data, setData] = useState([]);
    const [order, setOrder] = useState("asc");

    let { stockId } = useParams();
    useEffect(() => {
        axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${stockId}`)
            .then(res => {console.log("got the data"); setData(res.data.payload[stockId]); return res.data.payload[stockId]})
            .then(data => {
                if(order === "asc") {
                    setData(data.sort((a, b) => Date.parse(a.time) - Date.parse(b.time)));
                }
                else {
                    setData(data.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)));
                }
            })
    }, [order]);

    const toggleOrder = () => {
        setOrder(order === "asc" ? "desc" : "asc");
    }

    let header, body;
    if(data.length) {
        header = <tr>{Object.keys(data[0]).map(column => <th>{column}</th>)}</tr>;
        body = data.map(row => <tr>{Object.values(row).map(val => <td>{val}</td>)}</tr>);
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
            <div>
                <button onClick={toggleOrder}>{order === "asc" ? "desc" : "asc"}</button>
            </div>
        </div>
    )
}