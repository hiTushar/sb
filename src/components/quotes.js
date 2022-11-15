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
            .then(res => {console.log("got the data"); reorderData(order, res.data.payload[stockId]);})
    }, []);

    const reorderData = (order, data) => {
        console.log("reorderData", order);
        if(order === "asc") {
            console.log('**');
            setData(data.sort((a, b) => Date.parse(a.time) - Date.parse(b.time)));
        }
        else {
            console.log('##');
            setData(data.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)));
        }
    }

    useEffect(() => {
        console.log("rearrange", order);
        reorderData(order, data);
    }, [order])

    const toggleOrder = () => {
        console.log("toggleOrder", order);
        setOrder(order === "asc" ? "desc" : "asc");
    }

    let header, body;
    if(data.length) {
        console.log(data);
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