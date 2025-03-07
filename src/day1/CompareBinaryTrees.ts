export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // base cases
    // cannot recurse futher in both subtrees (structural check)
    if (a === null && b === null) {
        return true;
    }
    // structurally not the same (structural check)
    if (a === null || b === null) {
        return false;
    }
    // value check
    if (a.value !== b.value) {
        return false;
    }

    return compare(a.left, b.left) && compare(a.right, b.right);
}
