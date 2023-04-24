import { useEffect, useState } from "react";
import Puzzle from "../../pages/puzzle/types/puzzle";
import SwitchSimulation from "./switch";
import { Stack } from "@mui/material";
import { motion } from "framer-motion";

interface LightSwitchProps {
    setScore: React.Dispatch<React.SetStateAction<number | null>>;
}

function LightSwitch(props: LightSwitchProps) {
    let [gameState, setGameState] = useState<null | SwitchSimulation>(null);

    useEffect(() => {
        let simulation = new SwitchSimulation(
            Math.random() * 5 + 5,
            Math.random() * 7 + 10,
            props.setScore
        );
        setGameState(simulation);
    }, []);

    return (
        <div style={{ padding: "2vw" }}>
            <h1>Light Switch</h1>
            <p>The switches would help to toggle a certain range of lights. </p>
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
    name: "Light Switch",
    description:
        "You have 10 switches and 30 target lights. Each switch, upon clicked, could carry out one of the 3 operations: 1. Turn off any continuous range of lights, 2. Turn on any continuous range of lights, 3. Toggle any continuous range of lights. The goal is to turn on all the lights. The time taken to solve the puzzle is the score. Each puzzle will take at least 7 clicks on a switch to solve.",
    icon: "",
    component: LightSwitch,
    debrief: "todo",
};

export default LightSwitchGameDetails;
