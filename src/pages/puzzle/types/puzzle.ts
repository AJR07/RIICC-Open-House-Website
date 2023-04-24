type Puzzle = {
    name: string;
    description: string;
    debrief: string;
    icon: string;

    // Component Props: { setScore: React.Dispatch<React.SetStateAction<number>> }
    component: React.FC<{
        setScore: React.Dispatch<React.SetStateAction<number | null>>;
    }>;
};

export default Puzzle;
