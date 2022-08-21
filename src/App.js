import './App.css';
import {useEffect, useState} from "react";
import produce from 'immer';
import Settings from "./components/Settings/Settings";
import LayerGrid from "./components/LayerGrid/LayerGrid";
import LayerMovement from "./components/LayerMovement/LayerMovement";
import LayerPoints from "./components/LayerPoints/LayerPoints";

function App() {
    const [grid, setGrid] = useState([]);
    const [movement, setMovement] = useState([]);
    const [points, setPoints] = useState([]);
    const [scores, setScores] = useState(0);
    const [snake, setSnake] = useState([[2, 1], [3, 1]]);
    const [direction, setDirection] = useState('ArrowRight');

    const initLayerGrid = (w, h) => {
        const layer = [];
        for (let i = 0; i < w; i++) {
            const line = [];
            for (let j = 0; j < h; j++) {
                line.push({
                    content: 0
                });
            }
            layer.push(line);
        }
        return layer;
    };
    const initLayerMovement = (w, h, snake) => {
        const layer = [];
        for (let i = 0; i < w; i++) {
            const line = [];
            for (let j = 0; j < h; j++) {
                let state, head, tail = false;

                snake.forEach(([x, y], k) => {
                    if (x === i && y === j) {
                        state = true;
                        tail = 0 === k;
                        head = snake.length - 1 === k;
                    }
                });

                line.push({
                    state, head, tail
                });
            }
            layer.push(line);
        }
        return layer;
    };
    const initLayerPoints = (w, h, c) => {
        const [x, y, type] = c;

        const layer = [];
        for (let i = 0; i < w; i++) {
            const line = [];
            for (let j = 0; j < h; j++) {
                const enabled = x === i && y === j;
                line.push({
                    enabled,
                    type: enabled ? type : 0
                });
            }
            layer.push(line);
        }
        return layer;
    };

    const startGame = (w, h) => {
        setGrid(initLayerGrid(w, h));
        setMovement(initLayerMovement(w, h, snake));
        setPoints(initLayerPoints(w, h, [...randomXY(10), 0]));
    };

    const scorePointOfType = [1, 2, 3, 4, 5];
    const getScorePointByType = (type = 0) => {
        return scorePointOfType[type];
    };

    useEffect(() => {
        if (!grid.length) return;

        const intervalId = setInterval(() => {
            setSnake(prevState => {
                let [x, y] = prevState[prevState.length - 1];
                const newState = [...prevState];

                if (direction === 'ArrowUp') y -= 1;
                if (direction === 'ArrowDown') y += 1;
                if (direction === 'ArrowLeft') x -= 1;
                if (direction === 'ArrowRight') x += 1;

                const point = points[x][y];
                if (point.enabled) {
                    setScores(prevState => prevState + getScorePointByType(point.type));
                    setPoints(prevState => {
                        const [newX, newY] = randomXY(10);

                        return produce(prevState, draftState => {
                            draftState[x][y]['enabled'] = false;
                            draftState[newX][newY]['enabled'] = true;
                        });
                    });
                } else {
                    newState.shift();
                }

                newState.push([x, y]);

                setMovement(initLayerMovement(10, 10, newState));

                return newState;
            });
        }, 300);

        return () => {
            clearInterval(intervalId);
        }
    }, [grid, direction]);
    useEffect(() => {
        const allowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

        const listener = e => {
            setDirection(prevState => {
                if (!allowKeys.includes(e.key)) {
                    return prevState;
                }

                if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && (prevState === 'ArrowUp' || prevState === 'ArrowDown')) {
                    return prevState;
                }
                if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && (prevState === 'ArrowLeft' || prevState === 'ArrowRight')) {
                    return prevState;
                }

                return e.key;
            });
        };

        window.addEventListener('keyup', listener);

        return () => {
            window.removeEventListener('keyup', listener);
        };
    }, []);

    const randomXY = max => {
        const x = Math.floor(Math.random() * max);
        const y = Math.floor(Math.random() * max);

        return [x, y];
    };

    return (
        <div className="App">
            <header className="App-header">
                <span>Snake</span>
            </header>

            <div>
                Scores: {scores}
            </div>

            {grid.length === 0 && (
                <div>
                    <Settings />

                    <button onClick={() => startGame(10, 10)}>Начать игру</button>
                </div>
            )}

            {grid.length > 0 && (
                <div className="layers">
                    <LayerGrid layer={grid} />
                    <LayerMovement layer={movement} />
                    <LayerPoints layer={points} />
                </div>
            )}
        </div>
    );
}

export default App;
