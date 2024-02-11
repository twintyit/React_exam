import React, { useState, useEffect } from 'react';
import { icons } from '../resources/icons';
import { useParams } from 'react-router-dom';
import { writeRecord } from '../resources/localStorage';
import correctSound from '../sounds/correctSound.mp3';
import incorrectSound from '../sounds/incorrectSound.mp3';
import { useNavigate } from "react-router-dom";
import '../styles/Game.css'

const MemoryGame = ({ dimension, isOn }) => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [moves, setMoves] = useState(0);
    const [isWin, setIsWin] = useState(false);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isNewGame, setIsNewGame] = useState(false);
    const { username } = useParams();
    const [correct] = useState(new Audio(correctSound));
    const [incorrect] = useState(new Audio(incorrectSound));


    useEffect(() => {
        const newCards = [];
        for (let id = 0; id < dimension * dimension / 2; id++) {
            newCards.push({ id, icon: icons[id], isFlipped: true });
            newCards.push({ id, icon: icons[id], isFlipped: true });
        }
        const shuffledCards = newCards.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);

        setFlipped([]);
        setMoves(0);
        let cek = dimension === 4 ? 2000 : dimension === 6 ? 4000 : dimension === 8 ? 6000 : 0;
        setTimeout(() => {
            setCards(shuffledCards.map(item => ({
                ...item,
                isFlipped: false
            })));
            setIsActive(true);
            setTime(0);
        }, cek);
    }, [dimension, isNewGame]);


    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        if (isWin) {
            setIsActive(false);
            writeRecord(username, time, dimension, moves);
        }
    }, [isWin])

    const handleClick = (id, card) => {
        if (cards[id].isFlipped === false) {
            if (flipped.length === 0) {
                setFlipped([{ id, card }]);
                cards[id].isFlipped = true;
            } else if (flipped.length === 1) {
                cards[id].isFlipped = true;
                setFlipped([...flipped, { id, card }]);

                setMoves(moves + 1);
                if (card.id === flipped[0].card.id) {
                    correct.play();
                    cards[id].isFlipped = true;
                    setFlipped([]);
                } else {
                    incorrect.play();
                    setTimeout(() => {
                        cards[id].isFlipped = false;
                        cards[flipped[0].id].isFlipped = false;
                        setFlipped([]);
                    }, 1000);
                }
                setIsWin(checkWin());
            }
        }
    };

    const checkWin = () => {
        if (moves >= (dimension * dimension / 2) - 1) {
            return cards.every(item => item.isFlipped === true);
        } else {
            return false;
        }
    }

    return (
        <div className={`container-game ${isOn ? 'dark' : ''}`}>
            <h2>Memory Game</h2>


            <div className={`board ${dimension === 6 ? 'board-6x6' : dimension === 8 ? 'board-8x8' : ''}`}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index, card)}
                    >
                        {card.isFlipped > 0 ?
                            (
                                <img className='icon' src={card.icon} alt="" />
                            )
                            :
                            (
                                <div className='card'></div>
                            )
                        }

                    </div>
                ))}
            </div>
            <div className='statistic-game'>
                <h3>Moves: {moves}</h3>
                <h3>Time: {time} sec</h3>
            </div>
            <div className='game-buttons'>
                <button className={`button ${isOn ? 'dark' : ''}`} onClick={() => navigate(`/${username}/menu`)}>Menu</button>
                <button className={`button ${isOn ? 'dark' : ''}`} onClick={() => setIsNewGame(!isNewGame)}>New game</button>
            </div>
        </div >
    );
};

export default MemoryGame;