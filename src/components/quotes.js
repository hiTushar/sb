import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Quotes() {
    console.log("inside quotes");
    const [data, setData] = useState([]);

    let { stockId } = useParams();
    useEffect(() => {
        axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${stockId}`)
            .then(res => setData(res.data.payload[stockId]));
    }, [])

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
        </div>
    )
}