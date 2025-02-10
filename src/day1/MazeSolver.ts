// 3 recurse steps:
// pre
// recurse
// post

const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
]

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
     // 1. Base case: off the map?
     if (curr.x < 0 || curr.x >= maze[0].length ||
        curr.y < 0 || curr.y >= maze.length) {
            return false;
     }
     
     // 2. Base case: is it a wall?
     if (maze[curr.y][curr.x] === wall) {
        return false;
     }

    // 3. Base case: are we at the end?
    if (curr.x ===end.x && curr.y === end.y) {
        path.push(end)
        return true;
    }

    // 4. Base case: have we seen it?
    if (seen[curr.y][curr.x]) {
        return false
    }

    // pre
    seen[curr.y][curr.x] = true;
    path.push(curr);

    // recurse
    for (let i=0; i<dir.length; i++) {
        const [x, y] = dir[i];
        const nextCurr = {
            x: curr.x + x,
            y: curr.y + y
        }
        const result = walk(maze, wall, nextCurr, end, seen, path)
        if (result) { // if we find an end, we finish
            return true;
        }
    }

    // post
    path.pop()
    return false;


}

// o(n) complexity, becase we check always 4 dorections in the worst case
export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[i].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;

}