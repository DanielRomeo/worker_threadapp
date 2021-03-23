const { parentPort, isMainThread } = require('worker_threads');

if(!isMainThread){
    parentPort.on('message', (obj) => {
        console.log('Your process has stated');
        let b = 0;
        for(let i = 0; i < 10000000000; i++){
            b++;
        }
        console.log(`process complete, and b is : ${b}`);

        //push the data back to the main thread
        // parentPort.postMessage();
    });

    // parentPort.postMessage("Hello, This is a message from the worker");
}
