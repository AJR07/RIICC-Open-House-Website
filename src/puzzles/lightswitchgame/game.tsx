import { useEffect, useState } from "react";
import Puzzle from "../../pages/puzzle/types/puzzle";
import SwitchSimulation from "./switch";
import { Stack } from "@mui/material";
import { motion } from "framer-motion";
import StopWatch from "../../components/stopwatch";
import SetScoreFn from "../../pages/puzzle/types/setScoreFn";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { NilScore } from "../../pages/puzzle/types/score";
import formatTime from "../../utils/formattime";

interface LightSwitchProps {
    setScore: SetScoreFn;
}

// const isDev = import.meta.env.MODE == "development";
// const TIME_LIMIT = isDev ? 5000 : 2 * 60 * 1000;
const TIME_LIMIT = 2 * 60 * 1000;

function LightSwitch(props: LightSwitchProps) {
    let [gameState, setGameState] = useState<null | SwitchSimulation>(null);
    let [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        let simulation = new SwitchSimulation(
            Math.random() * 2 + 7,
            Math.random() * 2 + 12,
            props.setScore
        );
        setGameState(simulation);
    }, []);

    if (timeElapsed > TIME_LIMIT) {
        props.setScore(new NilScore());
        return <div>Time's up!</div>;
    }

    return (
        <div style={{ padding: "2vw" }}>
            <h1>Light Switch</h1>
            <p>
                The switches would help to toggle a certain range of lights. The
                goal is to turn on all the lights.
            </p>
            <h3>Number of tries: {gameState?.tries ?? 0}</h3>
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
            {!gameState ? (
                <p>Loading...</p>
            ) : (
                <Stack>
                    <Stack direction="column">
                        <h1>Switches</h1>
                        <Stack direction="row" spacing={2}>
                            {gameState.switches.map((switchState, index) => {
                                return (
                                    <motion.img
                                        src={
                                            switchState.on
                                                ? "/switch-on.png"
                                                : "/switch-off.png"
                                        }
                                        key={index}
                                        onClick={() => {
                                            gameState!.toggleSwitch(
                                                index,
                                                timeElapsed
                                            );

                                            // duplicate object
                                            setGameState(
                                                Object.assign(
                                                    Object.create(
                                                        Object.getPrototypeOf(
                                                            gameState
                                                        )
                                                    ),
                                                    gameState
                                                )
                                            );
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            width: "5vw",
                                            borderRadius: "1vw",
                                            color: "black",
                                            border: 0,
                                        }}
                                    />
                                );
                            })}
                        </Stack>
                    </Stack>
                    <Stack direction="column">
                        <h1>Lights</h1>
                        <Stack direction="row" spacing={3}>
                            {gameState.lights.map((lightState, index) => {
                                return (
                                    <img
                                        key={index}
                                        src="/light-on.png"
                                        style={{
                                            width: "3vw",
                                            filter: lightState
                                                ? ""
                                                : "grayscale(1) brightness(50%)",
                                        }}
                                    />
                                );
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </div>
    );
}

const LightSwitchGameDetails: Puzzle = {
    name: "Light Switch Game",
    description:
        "You have 7-9 switches, and 12-14 lights. Each switch would toggle a certain range of lights. Thus, if the toggled range has lights: 'on on off off', the switch will cause the lights to become: 'off off on on'. The goal is to turn on all the lights. The amount of tries taken to solve the puzzle is the score, and the solution to the puzzle requires at least 3 switches to be toggled.",
    icon: LightbulbIcon,
    component: LightSwitch,
    debrief:
        "Reflect on how your strategy could have been improved, or did you use a strategy to begin with? There are a few techniques that can minimize your time for this puzzle. That includes: 1. Remembering which switch toggles what range, 2. When a few lights are left to be switched on, only fiddling and toggling those that affect those lights, 3. A switch which toggles a large range might still be needed to fix a few lights, so don't hesitate to toggle them, 4. Just keep toggling, do not waste time.",
};

export default LightSwitchGameDetails;
