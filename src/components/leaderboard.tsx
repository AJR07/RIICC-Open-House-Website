import {
    DataSnapshot,
    get,
    getDatabase,
    onValue,
    ref,
} from "firebase/database";
import firebaseApp from "../utils/firebase";
import { useEffect, useState } from "react";
import LeaderBoardData from "../types/leaderboarddata";
import { Stack } from "@mui/material";

const database = getDatabase(firebaseApp);

interface LeaderBoardProps {
    gameID: string;
}

export default function LeaderBoard(props: LeaderBoardProps) {
    const [leaderboard, setLeaderboard] = useState<LeaderBoardData[]>([]);

    useEffect(() => {
        let reference = ref(database, `/game/${props.gameID}`);
        onValue(reference, (snapshot) => {
            if (!snapshot.exists()) return;
            let data = snapshot.val();
            let leaderboardData: LeaderBoardData[] = [];
            for (let dateData of Object.values(data)) {
                leaderboardData.push(dateData as LeaderBoardData);
            }
            // sort
            leaderboardData.sort((a, b) => {
                return b.score - a.score;
            });
            setLeaderboard(leaderboardData);
        });
    }, []);

    return (
        <div style={{ padding: "2vw" }}>
            <h1>Leaderboard</h1>
            <Stack>
                {leaderboard.map((data, index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                marginBottom: "5px",
                                padding: "0.5em",
                                border: "1px solid white",
                                borderRadius: "2px",
                            }}
                        >
                            <div>
                                {index + 1}. {data.name}
                            </div>
                            <div style={{ flexGrow: "1" }}></div>
                            <div>{data.scoreFormatted}</div>
                        </div>
                    );
                })}
            </Stack>
        </div>
    );
}
