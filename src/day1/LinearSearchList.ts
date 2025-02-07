// also called greedy search
// complexity is O(n) - running time increases, at most, linearly with the size of the items present in the list.
export default function linear_search(
    haystack: number[],
    needle: number,
): boolean {
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle) {
            return true;
        }
    }
    return false;
}
