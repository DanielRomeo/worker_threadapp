const express = require('express');
var path = require('path');
const { Worker, isMainThread, parentPort } = require('worker_threads');

const app = express();

const worker = new Worker('./worker.js');
if (isMainThread) {
    // This code is executed in the main thread and not in the worker.
  
    // Create the worker.
    
  
    // Listen for messages from the worker and print them.
    worker.on('message', (message) => {
       console.log(message); 
    });
    worker.on('error', (data) => {
        console.log('Got an Error');
    });
    worker.on('exit', (data) => {
        console.log('Exit');
    });

} 

let number = 1;

app.get('/', (req,res)=>{
    const obj = {
        "name": "Daniel"
    };

    

    if(number > 0){
        worker.postMessage(obj);
    }
    number--;
    res.sendFile(path.join(__dirname +'/index.html'));
});



app.listen(5000, ()=>{
    console.log("server has started");
});