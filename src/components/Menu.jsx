import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../styles/Menu.css'

const Menu = ({ dimension, setDimension, isOn, setIsOn }) => {
    const navigate = useNavigate();
    const { username } = useParams();

    return (
        <>
            <div className={`menu-container ${isOn ? 'dark' : ''}`}>
                <h2>Menu</h2>
                <div className="select-menu">
                    Select Dimension:
                    <select className={`select ${isOn ? 'dark' : ''}`} value={dimension} onChange={() => setDimension(Number(event.target.value))}>
                        <option value={4}>4x4</option>
                        <option value={6}>6x6</option>
                        <option value={8}>8x8</option>
                    </select>
                </div>
                <button className={`button ${isOn ? 'dark' : ''}`} onClick={() => { navigate(`/${username}/game`); }}>Start game</button>
                <button className={`button ${isOn ? 'dark' : ''}`} onClick={() => { navigate(`/${username}/recordsTable`); }}>Show records</button>
            </div >
        </>
    );
}

export default Menu;