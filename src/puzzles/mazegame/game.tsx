import { MouseEventHandler, useState } from "react";
import Puzzle from "../../pages/puzzle/types/puzzle";
import { MazeData } from "./maze";
import StopWatch from "../../components/stopwatch";
import { TimeScore } from "../../pages/puzzle/types/score";
import SearchIcon from "@mui/icons-material/Search";
import SetScoreFn from "../../pages/puzzle/types/setScoreFn";

interface MazeGameProps {
    setScore: SetScoreFn;
}

const ROWS = 20;
const COLS = 20;

function MazeGame(props: MazeGameProps) {
    const [maze] = useState(new MazeData(ROWS, COLS));
    const [selectedCells, setSelectedCells] = useState<number[]>([]);
    const [timeElapsed, setTimeElapsed] = useState(0);

    const gridSqSize = "20px";

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
                        top: `calc(${gridSqSize} * ${i})`,
                        left: `calc(${gridSqSize} * ${j})`,
                        width: gridSqSize,
                        height: gridSqSize,
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
        <div style={{ userSelect: "none" }}>
            <StopWatch
                timeElapsed={timeElapsed}
                setTimeElapsed={setTimeElapsed}
            />
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
    description:
        "You are given a 20x20 maze. Find the way from the start to the exit in the fastest time possible! The time taken to find the exit is your score.",
    icon: SearchIcon,
    component: MazeGame,
    debrief:
        "Reflect on the process which you used to solve the maze. \
    How did you systematically try to find your way to the exit? \
    Do you know if that is the shortest possible path? \
    How <em>do</em> you find the shortest possible path? \
    <br />  \
    P.S. what sort of algorithm (i.e. process) was used to generate this random maze in the first place? \
    A few tips to get you started: \
    1. You should try to generally move towards the exit. \
    2. You should try to avoid going back to places you've already been. \
    3. Do not be afraid to backtrack if you get stuck. \
    4. You can initially use your eyes to trace the path, it could be more efficient \
    5. You could try to go from the exit to the start instead if you get stuck.",
};

export default MazeGameDetails;
