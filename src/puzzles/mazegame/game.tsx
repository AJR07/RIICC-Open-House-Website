import { MouseEventHandler, useEffect, useState } from "react";
import Puzzle from "../../pages/puzzle/types/puzzle";
import { MazeData } from "./maze";
import StopWatch from "../../components/stopwatch";
import { NilScore, TimeScore } from "../../pages/puzzle/types/score";
import SearchIcon from "@mui/icons-material/Search";
import SetScoreFn from "../../pages/puzzle/types/setScoreFn";
import formatTime from "../../utils/formattime";

interface MazeGameProps {
    setScore: SetScoreFn;
}

const isDev = false; //import.meta.env.MODE == "development";
const ROWS = isDev ? 5 : 20;
const COLS = isDev ? 5 : 20;
const TIME_LIMIT = isDev ? 5000 : 2 * 60 * 1000; // two minutes

function MazeGame(props: MazeGameProps) {
    const [maze] = useState(new MazeData(ROWS, COLS));
    const [selectedCells, setSelectedCells] = useState<number[]>([]);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const gridSqSize = 30;

    const borderStyle = "1px solid white";
    const noBorderStyle = "none";

    const divs = [];
    for (let i = 0; i < maze.height; i++) {
        for (let j = 0; j < maze.width; j++) {
            const cell = maze.coordToCell(i, j);
            const onMouseEnter: MouseEventHandler<HTMLDivElement> = (ev) => {
                if (ev.buttons != 1) return;

                if (
                    selectedCells.length >= 2 &&
                    selectedCells.indexOf(cell) == selectedCells.length - 2
                ) {
                    setSelectedCells(() => selectedCells.slice(0, -1));
                    return;
                }

                if (selectedCells.includes(cell)) return;

                if (selectedCells.length == 0) {
                    if (i == 0 && j == 0) {
                        setSelectedCells([cell]);
                    }
                    return;
                }

                const latest = selectedCells.at(-1)!;
                if (
                    maze.isAdjacent(cell, latest) &&
                    !maze.hasWallBetween(cell, latest)
                ) {
                    setSelectedCells(() => [...selectedCells, cell]);
                    if (i == maze.height - 1 && j == maze.width - 1) {
                        // completed the thing
                        props.setScore(new TimeScore(timeElapsed));
                    }
                }
            };

            divs.push(
                <div
                    key={`${i}-${j}`}
                    onMouseEnter={onMouseEnter}
                    onMouseDown={onMouseEnter}
                    style={{
                        position: "absolute",
                        top: `${gridSqSize * i}px`,
                        left: `${gridSqSize * j}px`,
                        width: `${gridSqSize}px`,
                        height: `${gridSqSize}px`,
                        boxSizing: "border-box",

                        backgroundColor: selectedCells.includes(cell)
                            ? selectedCells.at(-1) == cell
                                ? "red"
                                : "blue"
                            : "transparent",

                        // each cell only draws the border on the bottom and right, to avoid duplicating
                        // except for the leftmost and topmost cells
                        borderTop:
                            i == 0 && maze.hasWall(cell, "top")
                                ? borderStyle
                                : noBorderStyle,
                        borderBottom: maze.hasWall(cell, "bottom")
                            ? borderStyle
                            : noBorderStyle,
                        borderLeft:
                            j == 0 && maze.hasWall(cell, "left")
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
        <div style={{ padding: "2vw" }}>
            <h1>Maze</h1>
            <p>
                Find the path to from the start (top left) to the finish (bottom
                right)! You can click and drag to draw out the path.
            </p>
            <h3>Time limit: {formatTime(TIME_LIMIT, true)}</h3>
            <StopWatch
                timeElapsed={timeElapsed}
                setTimeElapsed={setTimeElapsed}
                timeout={{
                    value: TIME_LIMIT,
                    callback: () => {
                        props.setScore(new NilScore());
                    },
                }}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "5em",
                    // width: "100%",
                    // height: "100%",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: `${gridSqSize * maze.width}px`,
                        height: `${gridSqSize * maze.height}px`,
                    }}
                >
                    {divs}
                </div>
            </div>
        </div>
    );
}

const MazeGameDetails: Puzzle = {
    name: "Maze",
    description:
        "You are given a 20x20 maze. Find the way from the start to the exit in the fastest time possible! The time taken to find the exit is your score.",
    icon: SearchIcon,
    component: MazeGame,
    debrief: `Reflect on the process which you used to solve the maze. 
    How did you systematically try to find your way to the exit? 
    Do you know if that is the shortest possible path? 
    How <em>do</em> you find the shortest possible path? 
    A few tips to get you started: 
    1. You should try to generally move towards the exit. 
    2. You should try to avoid going back to places you've already been. 
    3. Do not be afraid to backtrack if you get stuck. 
    4. You can initially use your eyes to trace the path, it could be more efficient 
    5. You could try to go from the exit to the start instead if you get stuck. 
    <br />  
  P.S.what sort of algorithm(i.e.process) was used to generate this random maze in the first place?`,
};

export default MazeGameDetails;
