import SetScoreFn from "./setScoreFn";

type Puzzle = {
    name: string;
    description: string;
    debrief: string;
    icon: string;

    // Component Props: { setScore: SetScoreFn }
    component: React.FC<{
        setScore: SetScoreFn;
    }>;
};

export default Puzzle;
