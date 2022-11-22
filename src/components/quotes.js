import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

export default function Quotes() {
    const [data, setData] = useState([]);
    const [order, setOrder] = useState("asc");

    let { stockId } = useParams();
    useEffect(() => {
        axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${stockId}`)
            .then(res => {reorderData(order, res.data.payload[stockId]);})
    }, []);

    useEffect(() => {
        reorderData(order, data);
    }, [order])

    const reorderData = (order, data) => {
        setData(_.orderBy(data, ['time'], [order]));
    }

    const toggleOrder = () => {
        setOrder(order === "asc" ? "desc" : "asc");
    }

    let header, body;
    if(data.length) {
        header = <tr>{Object.keys(data[0]).map(column => <th key={column}>{column}</th>)}</tr>;
        body = data.map(row => <tr key={row.price + Date.parse(row.time)}>
                                {Object.values(row).map(val => <td key={val}>{val}</td>)}
                               </tr>);
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