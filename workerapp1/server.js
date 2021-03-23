const express = require('express');
var path = require('path');
const { Worker, isMainThread, parentPort } = require('worker_threads');
const app = express();

// Create the worker.
const worker = new Worker('./worker.js');
if (isMainThread) {
    // This code is executed in the main thread and not in the worker.    
  
    // Listen for messages from the worker and print them.
    worker.on('message', (message) => {
       console.log(message); // log the object from the worker
    });
    worker.on('error', (data) => {
        console.log('Got an Error');
    });
    worker.on('exit', (data) => {
        console.log('Exit');
    });

} 

/*  Basic effort in trying to run the worker once... 
    in a normal app, 
    I would have a function that calls/uses a worker_thread for a particular task alone 
*/
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