// complexity is O(log n) or worst case O(n) - depending on the hight of the tree and how balanced it is
function search(current: BinaryNode<number> | null, needle: number): boolean {
    if (!current) {
        return false;
    }
    if (current.value === needle) {
        return true;
    }

    if (current.value < needle) {
        return search(current.right, needle);
    }

    return search(current.left, needle);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}
