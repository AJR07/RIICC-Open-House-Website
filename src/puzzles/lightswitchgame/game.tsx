import Puzzle from "../../pages/puzzle/types/puzzle";

interface LightSwitchProps {
    setScore: React.Dispatch<React.SetStateAction<number>>;
}

function LightSwitch(props: LightSwitchProps) {
    return <div>HI</div>;
}

const LightSwitchGameDetails: Puzzle = {
    name: "Light Switch",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    icon: "",
    component: LightSwitch,
};

export default LightSwitchGameDetails;
