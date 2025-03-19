// complexity is o(v^2)
export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const previous = new Array(graph.length).fill(-1);

    seen[source] = true;
    const queue: number[] = [source];

    do {
        const curr = queue.shift() as number;
        if (curr === needle) {
            break;
        }

        const adjacencies = graph[curr];
        for (let i = 0; i < adjacencies.length; i++) {
            if (adjacencies[i] === 0) {
                continue;
            }
            if (seen[i]) {
                continue;
            }
            seen[i] = true;
            previous[i] = curr;
            queue.push(i);
        }
    } while (queue.length);

    if (previous[needle] === -1) {
        return null;
    }

    // build it backwards
    let current = needle;
    const out: number[] = [];

    while (previous[current] !== -1) {
        out.push(current);
        current = previous[current];
    }

    return [source].concat(out.reverse());
}
