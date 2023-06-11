import {MinHeap} from './minheap.js';
import { Visualize } from './visualize.js'; 
export {HuffmanCoder};

class HuffmanCoder {
    
    postOrderTraversal(node){
        if (node == null)
        return;

        else{
        console.log((node[0]));

        
 
        if(typeof(node[1])!=="string")
        {
            this.postOrderTraversal(node[1][0]);
            this.postOrderTraversal(node[1][1]);
        }
        if (typeof(node[1])==="object"){
            let dataNode=[node[0],"$"];                        
            this.postList.push(dataNode);
            // console.log("$");
        }
        if(typeof(node[1])==="string"){

            let dataNode=[node[0],node[1]];                        
            this.postList.push(dataNode);
            // console.log(node[1]);
            return;
        }
    }

    }


    buildCodeMap(node, code){
        if(typeof(node[1])==="string"){
            this.codeMap[node[1]] = code;
            return;
        }

        this.buildCodeMap(node[1][0],code+"0");
        this.buildCodeMap(node[1][1],code+"1");
    }

    //huffmanTree ->  string
    stringify(node){
        if(typeof(node[1])==="string"){
            return '\'' +node[1];
        }
        return '0'+this.stringify(node[1][0])+'1' + this.stringify(node[1][1]);
    }

    deStringify(data){
        let node = [];
        if(data[this.ind]==='\''){
            this.ind++;
            node.push(data[this.ind]);
            this.ind++;
            return node;
        }

        this.ind++;
        let left = this.deStringify(data);
        node.push(left);
        this.ind++;
        let right = this.deStringify(data);
        node.push(right);

        return node;
    }
        
    // deStringify(data) {
    //     let stack = [];
    //     let node = [];
    //     let ind = 0;
      
    //     while (ind < data.length) {
    //       if (data[ind] === "'") {
    //         ind++;
    //         node.push(data[ind]);
    //         ind++;
    //       }
    //        else {
    //         ind++;
    //         let left = stack.pop();
    //         if (left === undefined) {
    //           stack.push(node);
    //           stack.push(left);
    //           continue;
    //         }
    //         let right = stack.pop();
    //         node = stack.pop();
    //         node.push(left);
    //         node.push(right);
    //       }
      
    //       stack.push(node);
    //     }
      
    //     return node;
    //   }
      
    encode(data){
        console.log(data)

        this.heap = new MinHeap();

        //character frequency map from input data
        const freqMap = new Map(); 
        for( let i=0; i<data.length; i++){
            if(data[i] in freqMap){
                freqMap[data[i]]++; 
            }
            else{
                freqMap[data[i]] = 1;
            }                
        }

        for(let key in freqMap){
            this.heap.insert([freqMap[key],key]);
        }

        //build huffman tree
        while(this.heap.size()>1){
            const node1= this.heap.extractMin();
            const node2= this.heap.extractMin();

            const parent= [node1[0]+node2[0],[node1,node2]];
            this.heap.insert(parent);
        }

        const huffmanTree= this.heap.extractMin();

        // console.log(typeof(huffmanTree[1]));

        this.postList= [];
        this.postOrderTraversal(huffmanTree);
        console.log(this.postList);

        Visualize(this.postList);
        
        

        this.ind = 0;
        this.codeMap=new Map();
        this.buildCodeMap(huffmanTree,"");

        // console.log(this.codeMap)

        let binaryString="";
        for (let i=0; i<data.length; i++){
            binaryString+=this.codeMap[data[i]]; //matching the input character to its code
        }

        //padding
        let paddingLength= (8-binaryString.length%8)%8;
        let paddingString="";

        for(let i=0; i<paddingLength; i++){
            paddingString+="0";
        }

        binaryString+=paddingString;

        // byte to ascii conversion

        let newASCII= ""

        for (let i =0;i<binaryString.length; i+=8){
            let decimal=0;
            for (let j=0; j<8; j++){
                decimal= decimal*2 + parseInt(binaryString[i+j]);
            }
            newASCII+=String.fromCharCode(decimal);
        }
        // console.log(newASCII)

        let finalData = this.stringify(huffmanTree)+'\n'+paddingLength+'\n'+newASCII;


     //compression ratio
        let ratio = "Compression Ratio: "+ data.length/ finalData.length;

        let display="treeDisplay";

        return [finalData,display,ratio];
    }

    decode(data){
        console.log(data)
        data = data.split("\n");

        if(data.length===4){
            data[0] = data[0] + "\n" + data[1];
            data[1] = data[2];
            data[2] = data[3];
            data.pop();
        }

        this.ind = 0;
        const huffmanTree = this.deStringify(data[0]);
        console.log(huffmanTree);
        const text = data[2];
        let binaryString = "";

        for(const element of text){
            let num = element.charCodeAt(0);
            let bin = "";
            for(let j =0;j<8;j++){
                bin = num%2  + bin;
                num = Math.floor(num/2);
            }
            binaryString = binaryString + bin;
        }
        binaryString = binaryString.substring(0,binaryString.length-data[1]);
        
        console.log(binaryString);

        let res = "";
        let node = huffmanTree;

        for(const element of binaryString){
            if(element==='0'){
                node = node[0];
            }else{
                node = node[1];
            }

            if(typeof(node[0])==="string"){
                res += node[0];
                node = huffmanTree;
            }
        }
        
        console.log(res)

        let info = "Decompression Complete";
        let displayData ="sampleDisplay";
        return [res,displayData,info];
    
    }

};
