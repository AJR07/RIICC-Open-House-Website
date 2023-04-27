import { Stack } from "@mui/material";
import { useLeaderboard } from "../hooks/leaderboardhook";

interface LeaderBoardProps {
    gameID: string;
}

export default function LeaderBoard(props: LeaderBoardProps) {
    const leaderboard = useLeaderboard(props.gameID);

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
