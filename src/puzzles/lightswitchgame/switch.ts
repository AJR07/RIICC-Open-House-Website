import { CountScore } from "../../pages/puzzle/types/score";
import SetScoreFn from "../../pages/puzzle/types/setScoreFn";

interface Switch {
    startRange: number;
    endRange: number;
    on: boolean;
}

export default class SwitchSimulation {
    switchLength: number;
    lightLength: number;
    switches: Switch[];
    lights: boolean[];
    setScore: SetScoreFn;

    constructor(
        switchLength: number,
        lightLength: number,
        setScore: SetScoreFn
    ) {
        this.switchLength = switchLength;
        this.lightLength = lightLength;
        this.setScore = setScore;

        this.switches = [];
        this.lights = [];
        this.generateSwitches();
    }

    generateSwitches() {
        this.switches = [];
        this.lights = [];

        for (let i = 0; i < this.lightLength; i++) {
            this.lights.push(Math.random() > 0.5);
        }

        for (let i = 0; i < this.switchLength; i++) {
            let start = Math.floor(Math.random() * this.lightLength);
            this.switches.push({
                startRange: start,
                endRange: Math.floor(
                    Math.random() * (this.lightLength - start) + start
                ),
                on: false,
            });
        }

        if (!this.validateSwitches()) this.generateSwitches();
    }

    validateSwitches(): boolean {
        let possibleCombi = Math.pow(2, this.switchLength);
        let valid = false;

        for (let i = 0; i < possibleCombi; i++) {
            // break down i into binary string with length of switchLength
            let initialConfigLights = this.lights.slice();

            let binary = i.toString(2).padStart(this.switchLength, "0");

            for (
                let switchStateIdx = 0;
                switchStateIdx < binary.length;
                switchStateIdx++
            ) {
                if (binary[switchStateIdx] === "0") continue;

                let switchObj = this.switches[switchStateIdx];
                for (
                    let lightIdx = switchObj.startRange;
                    lightIdx <= switchObj.endRange;
                    lightIdx++
                ) {
                    initialConfigLights[lightIdx] =
                        !initialConfigLights[lightIdx];
                }
            }

            let curValid = true;
            for (let light of initialConfigLights) {
                if (!light) {
                    curValid = false;
                    break;
                }
            }
            if (curValid) {
                valid = true;
                break;
            }
        }
        return valid;
    }

    toggleSwitch(switchIdx: number) {
        let switchObj = this.switches[switchIdx];
        for (
            let lightIdx = switchObj.startRange;
            lightIdx <= switchObj.endRange;
            lightIdx++
        ) {
            this.lights[lightIdx] = !this.lights[lightIdx];
        }
        switchObj.on = !switchObj.on;

        if (this.checkWin()) {
            setTimeout(() => {
                this.setScore(new CountScore(this.switchLength));
            }, 2000);
        }
    }

    checkWin(): boolean {
        for (let light of this.lights) {
            if (!light) return false;
        }
        return true;
    }
}
