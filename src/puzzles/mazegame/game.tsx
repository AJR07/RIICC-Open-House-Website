import { MouseEventHandler, useEffect, useState } from "react";
import Puzzle from "../../pages/puzzle/types/puzzle";
import formatTime from "../../utils/formattime";
import { MazeData } from "./maze";

interface MazeGameProps {
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

const ROWS = 20;
const COLS = 20;

function MazeGame(props: MazeGameProps) {
    const [maze] = useState(new MazeData(ROWS, COLS));
    const [selectedCells, setSelectedCells] = useState<number[]>([]);

    const gridSqSize = "20px";

    const borderStyle = "1px solid white";
    const noBorderStyle = "none";

    const [startTime] = useState(Date.now());
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setTimeElapsed(Date.now() - startTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    const divs = [];
    for (let i = 0; i < maze.height; i++) {
        for (let j = 0; j < maze.width; j++) {
            const cell = maze.coordToCell(i, j);
            const onMouseEnter: MouseEventHandler<HTMLDivElement> = (ev) => {
                if (ev.buttons != 1) return;

                if (selectedCells.includes(cell)) {
                    return;
                }

                if (selectedCells.length == 0) {
                    if (i == 0 && j == 0) {
                        setSelectedCells([cell]);
                    } else {
                        return;
                    }
                }

                const latest = selectedCells[selectedCells.length - 1];
                if (maze.isConnected(cell, latest)) {
                    setSelectedCells(() => [...selectedCells, cell]);
                }
            };

            divs.push(
                <div
                    key={`${i}-${j}`}
                    onMouseEnter={onMouseEnter}
                    style={{
                        position: "absolute",
                        top: `calc(${gridSqSize} * ${i})`,
                        left: `calc(${gridSqSize} * ${j})`,
                        width: gridSqSize,
                        height: gridSqSize,

                        backgroundColor: selectedCells.includes(cell)
                            ? "red"
                            : "transparent",

                        borderTop: maze.hasWall(cell, "top")
                            ? borderStyle
                            : noBorderStyle,
                        borderBottom: maze.hasWall(cell, "bottom")
                            ? borderStyle
                            : noBorderStyle,
                        borderLeft: maze.hasWall(cell, "left")
                            ? borderStyle
                            : noBorderStyle,
                        borderRight: maze.hasWall(cell, "right")
                            ? borderStyle
                            : noBorderStyle,
                    }}
                ></div>
            );
        }
    }

    return (
        <div>
            <p>Time elapsed: {formatTime(timeElapsed)}</p>
            <div
                style={{
                    position: "relative",
                    width: `calc(${gridSqSize} * ${maze.width})`,
                    height: `calc(${gridSqSize} * ${maze.height})`,
                }}
            >
                {divs}
            </div>
        </div>
    );
}

const MazeGameDetails: Puzzle = {
    name: "Maze",
    description: "Find the way to the exit in the fastest time possible!",
    icon: "",
    component: MazeGame,
};

export default MazeGameDetails;
