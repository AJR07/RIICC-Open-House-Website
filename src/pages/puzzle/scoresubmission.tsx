import { TextField, Stack } from "@mui/material";
import { useState } from "react";
import { compareScoreValue, Score } from "./types/score";
import { getDatabase, ref, set, update } from "firebase/database";
import firebaseApp from "../../utils/firebase";
import LeaderBoardData from "../../types/leaderboarddata";
import { useLeaderboard } from "../../hooks/leaderboardhook";

const db = getDatabase(firebaseApp);

interface ScoreSubmissionProps {
    score: Score;
    gameID: string;
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
                                        // override the score
                                        const newData = {
                                            ...existingEntry,
                                            score: props.score.value,
                                            scoreFormatted:
                                                props.score.toString(),
                                        };
                                        await update(ref(db), {
                                            [`game/${props.gameID}/${existingEntry.date}`]:
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

                            let date =
                                new Date()
                                    .toLocaleDateString("en-SG", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                    .replaceAll("/", "-") +
                                new Date().toLocaleString("en-SG", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                    hour12: false,
                                });

                            await set(ref(db, `game/${props.gameID}/${date}`), {
                                name: name,
                                score: props.score.value,
                                date: date,
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
