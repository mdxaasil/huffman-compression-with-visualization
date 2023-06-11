import { HuffmanCoder } from "./huffman.js";

function process(){
    console.log("Entered function");
    

    const encode = document.getElementById('encode');//encode button
    const decode = document.getElementById('decode');//decode button
    const temptext = document.getElementById('temptext');//space for text
    const upload = document.getElementById('uploadedFile');//uploaded file

    const coder= new HuffmanCoder();

    upload.addEventListener('change',()=>{ alert("File uploaded") });//when file is uploaded will display an alert

    //clicked on encode
    encode.onclick = function(){

        const uploadedFile = upload.files[0];
        if (uploadedFile===undefined){
            alert("No file uploaded!");
            return;
        }

        const fileReader= new FileReader();
        fileReader.onload= function(fileLoadedEvent){
            const text= fileLoadedEvent.target.result;
            if(text.length===0){
                alert("Text cannot be empty!");
                return;
            }
            let [encoded,tree_structure,info]=coder.encode(text);
            // console.log(encoded);
            // console.log(tree_structure)

            downloadFile(uploadedFile.name.split('.')[0]+'_encoded.txt',encoded);

            temptext.innerText=info;
        };
        fileReader.readAsText(uploadedFile,"UTF-8");
    }; 

    decode.onclick = function () {

        const uploadedFile = upload.files[0];
        if(uploadedFile===undefined){
            alert("No file uploaded !");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){//will see text file now
            const text = fileLoadedEvent.target.result;//will get all the written text in file 
            if(text.length===0){//file is blank
                alert("Text can not be empty ! Upload another file !");
                return;
            }
            let [decoded, tree_structure, info] = coder.decode(text);

            downloadFile(uploadedFile.name.split('.')[0] +'_decoded.txt', decoded);

            temptext.innerText = info;                                             
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };
};

function downloadFile(fileName, data){

    // let a = document.createElement('a');
    // a.href="data:application/octet-stream"+encodeURIComponent(data);
    // a.download= fileName;
    // a.click();

    const blob = new Blob([data], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  
    // Clean up the object URL after the download
    URL.revokeObjectURL(url);
}

window.onload = function () {
    process();
};