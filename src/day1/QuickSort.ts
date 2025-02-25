function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) {
        return;
    }
    const pivotIdx = partition(arr, lo, hi);

    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi];
    let idx = lo - 1;

    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            idx++;
            const temp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = temp;
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;
    return idx;
}

// devide and conquer strategy
// complexity: O(n log n), worst case (if the pivot is at the end of the array) O(n^2)
export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
