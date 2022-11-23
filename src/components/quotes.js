import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

export default function Quotes() {
    const [data, setData] = useState([]);
    const [order, setOrder] = useState("asc");
    const [refresh, setRefresh] = useState(0);

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
                let newData = sortData(order, res.data.payload[stockId], 'time');
                setData(newData);

            })
    }

    const sortData = (order, data, field) => {
        return _.orderBy(data, [field], [order]);
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