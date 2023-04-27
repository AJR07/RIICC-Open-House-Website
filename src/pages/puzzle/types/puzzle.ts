import { OverridableComponent } from "@mui/material/OverridableComponent";
import SetScoreFn from "./setScoreFn";
import { SvgIconTypeMap } from "@mui/material";

type Puzzle = {
    name: string;
    description: string;
    debrief: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };

    // Component Props: { setScore: SetScoreFn }
    component: React.FC<{
        setScore: SetScoreFn;
    }>;
};

export default Puzzle;
