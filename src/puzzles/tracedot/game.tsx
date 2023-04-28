import { useEffect, useState } from "react";
import Puzzle from "../../pages/puzzle/types/puzzle";
import StopWatch from "../../components/stopwatch";
import { CountScore, NilScore } from "../../pages/puzzle/types/score";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import SetScoreFn from "../../pages/puzzle/types/setScoreFn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Stack } from "@mui/material";

interface MazeGameProps {
    setScore: SetScoreFn;
}

const isDev = import.meta.env.MODE == "development";
const ROWS = isDev ? 500 : 1000;
const COLS = isDev ? 500 : 1000;
const TIME_LIMIT = isDev ? Infinity : 60 * 1000; // one minute

interface MousePos {
    x: number | null;
    y: number | null;
}

function TraceDot(props: MazeGameProps) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [clicks, useClicks] = useState(0);
    const [clickedPos, setClickedPos] = useState<MousePos>({
        x: null,
        y: null,
    });
    const [targetPos, setTargetPos] = useState<MousePos>({
        x: Math.floor(Math.random() * ROWS),
        y: Math.floor(Math.random() * COLS),
    });
    const [currentPos, setCurrentPos] = useState<MousePos>({ x: 0, y: 0 });

    useEffect(() => {
        document.onmousemove = (ev) => {
            setCurrentPos({ x: ev.clientX - 10, y: ev.clientY - 32 });
        };
    }, []);

    return (
        <Stack direction="row">
            <div>
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
                {clickedPos.x !== null && clickedPos.y !== null ? (
                    <div
                        style={{
                            position: "absolute",
                            marginLeft: clickedPos.x,
                            marginTop: clickedPos.y,
                        }}
                    >
                        <Stack
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {targetPos.y! - clickedPos.y > 0 ? (
                                <ArrowDownwardIcon
                                    style={{
                                        position: "absolute",
                                        marginTop: "40px",
                                    }}
                                />
                            ) : null}
                            <Stack
                                direction="row"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {targetPos.x! - clickedPos.x > 0 ? (
                                    <ArrowForwardIcon
                                        style={{
                                            position: "absolute",
                                            marginLeft: "40px",
                                        }}
                                    />
                                ) : null}
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "10px",
                                        backgroundColor: "red",
                                    }}
                                />
                                {targetPos.x! - clickedPos.x < 0 ? (
                                    <ArrowBackIcon
                                        style={{
                                            position: "absolute",
                                            marginRight: "40px",
                                        }}
                                    />
                                ) : null}
                            </Stack>
                            {targetPos.y! - clickedPos.y < 0 ? (
                                <ArrowUpwardIcon
                                    style={{
                                        position: "absolute",
                                        marginBottom: "40px",
                                    }}
                                />
                            ) : null}
                        </Stack>
                    </div>
                ) : null}
                <div
                    style={{
                        width: `${ROWS}px`,
                        height: `${COLS}px`,
                        border: "solid white",
                        margin: "1vw",
                    }}
                    onClick={() => {
                        useClicks((c) => c + 1);
                        setClickedPos(currentPos);
                        if (
                            clickedPos.x &&
                            clickedPos.y &&
                            Math.abs(clickedPos.x - targetPos.x!) < 10 &&
                            Math.abs(clickedPos.y - targetPos.y!) < 10
                        ) {
                            props.setScore(new CountScore(clicks));
                        }
                    }}
                />
            </div>
            <Stack>
                <h1>Trace Dot!</h1>
                <p style={{ margin: 0 }}>
                    Click a location and observe the arrows. They will point you
                    towards the direction of the final target. Guess your way to
                    the final target, to win!
                </p>
                <h2>Tries: {clicks}</h2>
            </Stack>
        </Stack>
    );
}

const TraceDotDetails: Puzzle = {
    name: "Trace Dot",
    description:
        "You are given a square. Upon clicking on some spot, 2 arrows will tell u which direction the target spot is. Keep guessing, until your guess is close enough to the target spot. The lesser ur guesses, the better! You have 1 minute.",
    icon: DoubleArrowIcon,
    component: TraceDot,
    debrief: `Think about what algorithms we could use to optimise this. 
    What if we had a 100x100 grid? What if we had a 1000x1000 grid? What if we had a 10000x10000 grid?
    There is something called 'Binary Search'. Basically, we want to use the arrow directions to narrow down the search space.
    for example, if the arrow directions are pointing up and right, we know that the target is in the top right quadrant.
    We can then put our next guess in the middle of that quadrant. We can keep doing this, until we get close enough to the target.
    This is the optimal solution to this game.
    `,
};

export default TraceDotDetails;
