// binary tree, breath first search
// when using queue data structure, the complexity is O(n),
// when using JS array it's O(n^2) due to its shift/unshift complexity O(n) - each level if complete is approximately half the size of the entire tree above it
// => if we need to do half the tree shiting off we'd had to do n amount of work n times = n squared
export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q: (BinaryNode<number> | null)[] = [head];

    while (q.length) {
        const current = q.shift() as BinaryNode<number> | undefined | null;

        if (!current) {
            continue;
        }

        // search
        if (current.value === needle) {
            return true;
        }

        q.push(current.left);
        q.push(current.right);
    }
    return false;
}
