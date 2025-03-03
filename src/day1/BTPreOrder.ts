function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    // base case
    if (!curr) {
        return path;
    }

    // pre
    path.push(curr.value);

    // recurse
    walk(curr.left, path);
    walk(curr.right, path);

    // post - optionally do don't return anything here and in base case and just pass+return path variable in parent
    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    // alternative when return type of walk is void
    // const path: number[] = []
    // walk(head, path)
    // return path;
    return walk(head, []);
}
