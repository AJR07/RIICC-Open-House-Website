import { TextField, Stack } from "@mui/material";
import { useState } from "react";
import { compareScoreValue, Score } from "./types/score";
import { getDatabase, push, ref, set, update } from "firebase/database";
import firebaseApp from "../../utils/firebase";
import LeaderBoardData from "../../types/leaderboarddata";
import { useLeaderboard } from "../../hooks/leaderboardhook";

const db = getDatabase(firebaseApp);

interface ScoreSubmissionProps {
    score: Score;
    gameID: string;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ScoreSubmission(props: ScoreSubmissionProps) {
    let [name, setName] = useState<string>("");
    let [statusMsg, setStatusMsg] = useState<string | null>(null);

    const leaderboard = useLeaderboard(props.gameID);

    if (statusMsg == null) {
        return (
            <Stack
                id="score-register-form"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#23a5ff",
                    // marginLeft: "20vw",
                    // marginRight: "20vw",
                    borderRadius: "1vw",
                    padding: "2vw",
                    paddingTop: 0,
                }}
            >
                <h3 style={{ color: "black" }}>
                    To register your score on the leaderboard, enter your name,
                    and press "enter".
                </h3>
                <TextField
                    label="Name"
                    variant="filled"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    fullWidth
                    onKeyPress={async (event) => {
                        if (event.key === "Enter" && name !== "") {
                            // check
                            if (name.trim().length > 50) {
                                alert(
                                    "Sorry, your name can't have more than 50 characters"
                                );
                                return;
                            }

                            // check if name already exists
                            const existingEntry = leaderboard.find(
                                (v) => v.name == name.trim()
                            );
                            if (existingEntry) {
                                if (
                                    confirm(
                                        "There is already someone with the same name on the leaderboard. If you re-trying the puzzle, click ok and your old score will be updated. Otherwise, go back and use a differnt name :D"
                                    )
                                ) {
                                    // check if it's faster than existing entry
                                    if (
                                        compareScoreValue(props.gameID)(
                                            props.score.value,
                                            existingEntry.score
                                        ) > 0
                                    ) {
                                        // not better
                                        alert(
                                            "Your new score is worse than your old score, so no changes will be made."
                                        );
                                        setStatusMsg(
                                            "Leaderboard wasn't updated with worse score."
                                        );
                                        return;
                                    } else {
                                        props.setUsername(name.trim());
                                        // override the score
                                        const newData = {
                                            ...existingEntry,
                                            score: props.score.value,
                                            scoreFormatted:
                                                props.score.toString(),
                                        };
                                        await update(ref(db), {
                                            [`game/${props.gameID}/${existingEntry.id}`]:
                                                newData,
                                        });
                                        setStatusMsg(
                                            "Successfully updated leaderboard!"
                                        );
                                    }
                                    return;
                                } else {
                                    return;
                                }
                            }

                            const newRef = push(
                                ref(db, `game/${props.gameID}`)
                            );
                            props.setUsername(name);
                            await set(newRef, {
                                name,
                                score: props.score.value,
                                id: newRef.key,
                                timestamp: Date.now(),
                                scoreFormatted: props.score.toString(),
                            } as LeaderBoardData);
                            setStatusMsg("Successfully recorded!");
                        }
                    }}
                />
            </Stack>
        );
    } else {
        return <h5>{statusMsg}</h5>;
    }
}
