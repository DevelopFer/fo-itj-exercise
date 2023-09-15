"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = exports.Node = void 0;
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
exports.Node = Node;
;
class List {
    constructor() {
        this.add = (value) => {
            const node = new Node(value);
            if (!this.head) {
                this.head = node;
                this.tail = this.head;
                this.size++;
                return;
            }
            let currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
            this.tail = currentNode.next;
            this.size++;
        };
        this.permute = () => {
            if (!this.head)
                return null;
            if (this.head === this.tail)
                return this.head;
            let currentNode = this.head;
            let prevToTail = this.head;
            let newHead = null;
            while (currentNode.next.next) {
                prevToTail = currentNode.next;
                currentNode = currentNode.next;
            }
            /** REARRANGE POINTERS */
            prevToTail.next = null;
            newHead = this.tail;
            newHead.next = this.head;
            this.head = newHead;
            this.tail = prevToTail;
        };
        this.buildPermutations = () => {
            if (!this.head)
                return null;
            let scout = this.head;
        };
        this.print = () => {
            let stringChain = "";
            if (!this.head)
                return null;
            let currentNode = this.head;
            while (currentNode.next) {
                stringChain += currentNode.value;
                currentNode = currentNode.next;
            }
            stringChain += currentNode.value;
            return stringChain;
        };
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}
exports.List = List;
;
//# sourceMappingURL=list.js.map