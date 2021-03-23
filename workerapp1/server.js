const express = ('express');
const { Worker, isMainThread, parentPort } = require('worker_threads');
const app = express();


if (isMainThread) {
  // This code is executed in the main thread and not in the worker.
  
  // Create the worker.
  const worker = new Worker('./worker.js');
  // Listen for messages from the worker and print them.
  worker.on('message', (msg) => { console.log(msg); });
} else {
  // This code is executed in the worker and not in the main thread.
  
  // Send a message to the main thread.
  parentPort.postMessage('Hello world!');
}



app.listen(5000, ()=>{
    console.log("server has started");
});