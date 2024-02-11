import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../styles/RecordsTable.css'

function RecordsTable({ isOn }) {
    const { username } = useParams();
    const navigate = useNavigate();
    const records = JSON.parse(localStorage.getItem('records')) || [];

    return (
        <div className={`records-table-container ${isOn ? 'dark' : ''}`}>
            <h2>Record table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of moves</th>
                        <th>Time</th>
                        <th>Field size</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{record.username}</td>
                            <td>{record.moves}</td>
                            <td>{record.time} sek</td>
                            <td>{`${record.dimension}X${record.dimension}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className={`button ${isOn ? 'dark' : ''}`} onClick={() => { navigate(`/${username}/menu`) }}>Menu</button>
        </div>
    );
}

export default RecordsTable;