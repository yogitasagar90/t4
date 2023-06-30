import React, { useState } from 'react'
import './PieChart.css'
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

const PieChart = () => {

    const [error, setError] = useState("");

    const [data, setData] = useState({
        datasets: [
            {
                backgroundColor: ["blue", "green"],
                data: [100],
            },
        ],
    });

    const [fee, setFee] = useState({
        yes: "",
        no: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (value <= 100 && value >= 0) {
            if (name === "yes") {
                setFee({ yes: value, no: 100 - value });
                setError("");
            } else {
                setFee({ yes: 100 - value, no: value });
                setError("");
            }
        } else {
            setError("must enter value from 0 to 100 only!!");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((fee.yes === "", fee.no === "")) {
            setError("please enter percentage value");
        } else if (!error) {
            setData({
                datasets: [
                    {
                        data: [fee.yes, fee.no],
                        backgroundColor: ["red", "blue"],
                    },
                ],
            });
        }
    };

    return (
        <div className="container">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="form">
                <div>
                    <label className='ba' htmlFor="yes">Box 1</label>
                    <input className='baa'
                        type="number"
                        value={fee.yes}
                        onChange={handleChange}
                    />
                </div>
                <div className="field">
                    <label className='bb' htmlFor="no">Box 2</label>
                    <input className='bba'
                        type="number"
                        value={fee.no}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSubmit}>Create Chart</button>
            </div>
            <div
                className="App"
                style={{ width: "20%", height: "60%", margin: "0 auto" }}
            >
                <Pie data={data} />
            </div>
        </div>
    );
};

export default PieChart;