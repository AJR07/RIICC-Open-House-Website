import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { compareScoreValue } from "../pages/puzzle/types/score";
import LeaderBoardData from "../types/leaderboarddata";
import firebaseApp from "../utils/firebase";
const database = getDatabase(firebaseApp);

export function useLeaderboard(gameID: string): LeaderBoardData[] {
    const [leaderboard, setLeaderboard] = useState<LeaderBoardData[]>([]);

    useEffect(() => {
        let reference = ref(database, `/game/${gameID}`);
        onValue(reference, (snapshot) => {
            if (!snapshot.exists()) return;
            let data = snapshot.val();
            let leaderboardData: LeaderBoardData[] = [];
            for (let dateData of Object.values(data)) {
                leaderboardData.push(dateData as LeaderBoardData);
            }
            leaderboardData.sort((a, b) =>
                compareScoreValue(gameID)(a.score, b.score)
            );
            setLeaderboard(leaderboardData);
        });
    }, []);

    return leaderboard;
}
