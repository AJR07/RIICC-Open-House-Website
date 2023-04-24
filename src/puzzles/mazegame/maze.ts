import shuffle from "../../utils/shuffle";
import UnionFind from "../../utils/ufds";

class Wall {
    // represents a wall between these two cells
    cellA: number;
    cellB: number;

    constructor(cellA: number, cellB: number) {
        this.cellA = cellA;
        this.cellB = cellB;
    }
}

export class MazeData {
    width: number; // in number of cells
    height: number;

    walls: Wall[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.walls = this.allWalls();
        this.generateMaze();
    }

    hasWall(cell: number, side: "top" | "bottom" | "left" | "right"): boolean {
        const [i, j] = this.cellToCoord(cell);

        if (i < 0 || i >= this.height)
            throw new Error(`i value out of range, ${i}`);
        if (j < 0 || j >= this.width)
            throw new Error(`j value out of range, ${j}`);

        // special cases for the entrance and exit
        if (i == 0 && j == 0 && side == "top") return false;
        if (i == this.height - 1 && j == this.width - 1 && side == "bottom")
            return false;

        switch (side) {
            case "top":
                return i == 0
                    ? true
                    : this.hasWallBetween(cell, this.coordToCell(i - 1, j));
            case "bottom":
                return i == this.height - 1
                    ? true
                    : this.hasWallBetween(cell, this.coordToCell(i + 1, j));
            case "left":
                return j == 0
                    ? true
                    : this.hasWallBetween(cell, this.coordToCell(i, j - 1));
            case "right":
                return j == this.width - 1
                    ? true
                    : this.hasWallBetween(cell, this.coordToCell(i, j + 1));
            default:
                throw new Error(`unknown side ${side}`);
        }
    }

    hasWallBetween(cellA: number, cellB: number): boolean {
        return (
            this.walls.findIndex(
                (w) =>
                    (w.cellA == cellA && w.cellB == cellB) ||
                    (w.cellA == cellB && w.cellB == cellA)
            ) != -1
        );
    }

    generateMaze(): void {
        shuffle(this.walls);

        const ufds = new UnionFind(this.width * this.height);

        for (let i = this.walls.length - 1; i >= 0; i--) {
            const wall = this.walls[i];
            if (!ufds.sameSet(wall.cellA, wall.cellB)) {
                this.walls.splice(i, 1);
                ufds.union(wall.cellA, wall.cellB);
            }
        }
    }

    private allWalls(): Wall[] {
        const walls: Wall[] = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.width - j > 1) {
                    walls.push(
                        new Wall(
                            this.coordToCell(i, j),
                            this.coordToCell(i, j + 1)
                        )
                    );
                }
                if (this.height - i > 1) {
                    walls.push(
                        new Wall(
                            this.coordToCell(i, j),
                            this.coordToCell(i + 1, j)
                        )
                    );
                }
            }
        }
        return walls;
    }

    coordToCell(x: number, y: number): number {
        return x + y * this.width;
    }

    cellToCoord(cell: number): [number, number] {
        return [cell % this.width, Math.floor(cell / this.width)];
    }

    isAdjacent(cellA: number, cellB: number): boolean {
        const [i, j] = this.cellToCoord(cellA);
        const [x, y] = this.cellToCoord(cellB);
        const manhattenDist = Math.abs(i - x) + Math.abs(j - y);
        return manhattenDist == 1;
    }
}
