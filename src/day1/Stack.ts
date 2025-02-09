type Node<T> = {
    value: T;
    previous?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        const node: Node<T> = { value: item };
        this.length++;
        if (!this.head) {
            this.head = node;
            return;
        }
        node.previous = this.head;
        this.head = node;
    }
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        const head = this.head as Node<T>;
        if (this.length === 0) {
            this.head = undefined;
            return head?.value;
        }

        this.head = head.previous;
        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
