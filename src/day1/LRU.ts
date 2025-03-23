type Node<T> = {
    value: T;
    next?: Node<T>;
    previous?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
    return { value };
}

// Least Recently Used (LRU) cache
// complexity o(1)
export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // does it exist?
        let node = this.lookup.get(key);
        if (!node) {
            // if it doesn't we need to insert
            //     - check for capacity and evict if over
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            // if it does, we need to update to the front of the list
            // and update the value
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
    }
    get(key: K): V | undefined {
        // check the cache for existence
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        // update the value we found and move it to the front
        this.detach(node);
        this.prepend(node);

        // return the value found or undefined if does not exit
        return node.value;
    }

    private detach(node: Node<V>): void {
        if (node?.previous) {
            node.previous.next = node.next;
        }
        if (node?.next) {
            node.next.previous = node.previous;
        }

        if (this.head === node) {
            this.head = this.head?.next;
        }

        if (this.tail === node) {
            this.tail = this.tail?.previous;
        }

        node.next = undefined;
        node.previous = undefined;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.previous = node;
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }
        const tail = this.tail as Node<V>;
        this.detach(tail);

        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}
