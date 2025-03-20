// o(v)
function hasUnvisited(seen: boolean[], distances: number[]): boolean {
    return seen.some((seen, index) => !seen && distances[index] < Infinity);
}

// o(v^2)
function getLowestUnvisited(seen: boolean[], distances: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; ++i) {
        if (seen[i]) {
            continue;
        }

        if (lowestDistance > distances[i]) {
            lowestDistance = distances[i];
            idx = i;
        }
    }
    return idx;
}

// complexity is o(v^2) || if used minHeap then only o(log v(v+e))
export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    // all of these are o(v)
    const seen = new Array(arr.length).fill(false);
    const previous = new Array(arr.length).fill(-1);
    const distances = new Array(arr.length).fill(Infinity);

    distances[source] = 0;

    // we need to go though the data twice in while+hasUnvisited = o(v^2) // if used with minHeap o(log v)
    while (hasUnvisited(seen, distances)) {
        const current = getLowestUnvisited(seen, distances); // also o(v^2) // if used with minHeap o(log v)
        seen[current] = true;

        const adjacencies = arr[current];
        for (let i = 0; i < adjacencies.length; ++i) {
            // o(e)
            const edge = adjacencies[i];
            if (seen[edge.to]) {
                continue;
            }
            const distance = distances[current] + edge.weight;
            if (distance < distances[edge.to]) {
                distances[edge.to] = distance;
                previous[edge.to] = current; // o(1) // if used with minHeap o(log v)
            }
        }
    }

    const out: number[] = [];
    let curr = sink;

    while (previous[curr] !== -1) {
        out.push(curr);
        curr = previous[curr];
    }

    out.push(source);
    return out.reverse();
}
