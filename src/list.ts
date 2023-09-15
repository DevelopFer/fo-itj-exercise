interface INode {
    value:string;
    next:INode;
}

export class Node implements INode {
    
    value: string;
    next: Node | null;
    
    
    constructor( value:string ){
        this.value = value;
        this.next  = null;
        
    }

};

export class List {
    
    head: INode | null;
    tail: INode | null;
    size: number;
    
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add = ( value:string ) => {
        const node = new Node(value);
        if( ! this.head ){
            this.head = node;
            this.tail = this.head;
            this.size++;
            return;
        }
        let currentNode = this.head;
        while( currentNode.next ){
            currentNode = currentNode.next;
        }
        currentNode.next = node;
        this.tail        = currentNode.next;
        this.size++;
    }

    permute = () => {
        if( ! this.head ) return null;
        if( this.head === this.tail ) return this.head;
        let currentNode = this.head;
        let prevToTail  = this.head;
        let newHead     = null;
        while( currentNode.next.next ){
            prevToTail  = currentNode.next;
            currentNode = currentNode.next;
        }
        /** REARRANGE POINTERS */
        prevToTail.next = null;
        newHead         = this.tail;
        newHead.next    = this.head;
        this.head       = newHead;
        this.tail       = prevToTail;
    }


    buildPermutations = () => {
        if( ! this.head ) return null;
        let scout = this.head;
        
    }

    print = () => {
        let stringChain = "";
        if( ! this.head ) return null;
        let currentNode = this.head;
        
        while( currentNode.next ){
            stringChain += currentNode.value;
            currentNode  = currentNode.next;
        }
        stringChain += currentNode.value;        
        return stringChain;
    }

};