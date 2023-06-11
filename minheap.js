export { MinHeap }

class MinHeap{
	constructor(){
		this.heap = []; // list for min heap implementation
	}
	insert(value){
		this.heap.push(value);
		this.heapifyUp(this.heap.length - 1);
	}
	size(){
		return this.heap.length;
	}
	empty(){
		return (this.size() == 0);
	}
	parent(index){
		return Math.floor((index-1)/2);
	}
	leftChild(index){
		return 2*index+1;
	}
	rightChild(index){
		return 2*index+2;
	}
	extractMin(){
		if(this.heap.length==0){
			return;
		}else if(this.heap.length==1){
			return this.heap.pop();
		}else{
			let minvalue = this.heap[0];
			this.heap[0] = this.heap.pop();
			this.heapifyDown(0);
			return minvalue;
		}
	}
	getMin(){
		return this.heap[0];
	}
	heapifyUp(index){
		while(index>0 && this.heap[index][0] < this.heap[this.parent(index)][0]){
			[this.heap[index],this.heap[this.parent(index)]] = [this.heap[this.parent(index)],this.heap[index]];
			index = this.parent(index);
		}
	}
	heapifyDown(index){
		let left = this.leftChild(index);
		let right = this.rightChild(index);
		let smallest = index;

		if(left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]){
			smallest = left;
		}
		if(right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]){
			smallest = right;
		}

		if(smallest!=index){
			[this.heap[smallest],this.heap[index]] = [this.heap[index],this.heap[smallest]];
			this.heapifyDown(smallest);
		}
	}
}