import { getDatabase } from "firebase/database";
import firebaseApp from "../utils/firebase";

const database = getDatabase(firebaseApp);

export default function LeaderBoard() {
    return (
        <div>
            <h1>Leaderboard</h1>
        </div>
    );
}
