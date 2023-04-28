import { Stack } from "@mui/material";
import { useLeaderboard } from "../hooks/leaderboardhook";

interface LeaderBoardProps {
    gameID: string;
    showTopThree?: boolean;
}

export default function LeaderBoard(props: LeaderBoardProps) {
    const leaderboard = useLeaderboard(props.gameID);

    return (
        <div style={{ padding: "2vw" }}>
            {props.showTopThree ? (
                <Stack>
                    <Stack style={{ display: "flex", alignItems: "center" }}>
                        <img src="/medal(1).png" style={{ width: "100px" }} />
                        <h2>
                            1st -{" "}
                            {leaderboard[0]
                                ? `${leaderboard[0].name} (${leaderboard[0].scoreFormatted})`
                                : "(EMPTY)"}
                        </h2>
                    </Stack>
                    <Stack direction="row">
                        <Stack
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <img
                                src="/medal(2).png"
                                style={{ width: "100px" }}
                            />
                            <h2>
                                2nd -{" "}
                                {leaderboard[1]
                                    ? `${leaderboard[1].name} (${leaderboard[1].scoreFormatted})`
                                    : "(EMPTY)"}
                            </h2>
                        </Stack>
                        <Stack
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <img
                                src="/medal(3).png"
                                style={{ width: "100px" }}
                            />
                            <h2>
                                3rd -{" "}
                                {leaderboard[2]
                                    ? `${leaderboard[2].name} (${leaderboard[2].scoreFormatted})`
                                    : "(EMPTY)"}
                            </h2>
                        </Stack>
                    </Stack>
                </Stack>
            ) : null}
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
                                #{index + 1}. {data.name}
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
