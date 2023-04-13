type Puzzle = {
    name: string;
    description: string;
    icon: string;

    // Component Props: { setScore: React.Dispatch<React.SetStateAction<number>> }
    component: React.FC<{
        setScore: React.Dispatch<React.SetStateAction<number>>;
    }>;
};

export default Puzzle;
