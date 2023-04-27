import { useEffect, useState } from "react";
import Puzzle from "../../pages/puzzle/types/puzzle";
import SwitchSimulation from "./switch";
import { Stack } from "@mui/material";
import { motion } from "framer-motion";
import StopWatch from "../../components/stopwatch";
import SetScoreFn from "../../pages/puzzle/types/setScoreFn";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

interface LightSwitchProps {
    setScore: SetScoreFn;
}

function LightSwitch(props: LightSwitchProps) {
    let [gameState, setGameState] = useState<null | SwitchSimulation>(null);
    let [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        let simulation = new SwitchSimulation(
            Math.random() * 2 + 5,
            Math.random() * 2 + 10,
            props.setScore
        );
        setGameState(simulation);
    }, []);

    return (
        <div style={{ padding: "2vw" }}>
            <h1>Light Switch</h1>
            <p>
                The switches would help to toggle a certain range of lights. The
                goal is to turn on all the lights.
            </p>
            <StopWatch
                timeElapsed={timeElapsed}
                setTimeElapsed={setTimeElapsed}
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
                                            gameState!.toggleSwitch(index);

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
                                        src={
                                            lightState
                                                ? "/light-on.png"
                                                : "/light-off.png"
                                        }
                                        style={{ width: "3vw" }}
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
        "You have 5-7 switches, and 10-12 lights. Each switch would toggle a certain range of lights. Thus, if the toggled range has lights: 'on on off off', the switch will cause the lights to become: 'off off on on'. The goal is to turn on all the lights. The time taken to solve the puzzle is the score.",
    icon: LightbulbIcon,
    component: LightSwitch,
    debrief:
        "Reflect on how your strategy could have been improved, or did you use a strategy to begin with? There are a few techniques that can minimize your time for this puzzle. That includes: 1. Remembering which switch toggles what range, 2. When a few lights are left to be switched on, only fiddling and toggling those that affect those lights, 3. A switch which toggles a large range might still be needed to fix a few lights, so don't hesitate to toggle them, 4. Just keep toggling, do not waste time.",
};

export default LightSwitchGameDetails;
