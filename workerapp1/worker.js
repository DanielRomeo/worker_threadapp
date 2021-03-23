const { parentPort, isMainThread } = require('worker_threads');

if(!isMainThread){
    parentPort.on('message', (obj) => {
        console.log('Your process has stated');
        let b = 0;
        for(let i = 0; i < 10000000000; i++){
            b++;
        }
        //push the data back to the main thread
        let parsedJSON = {
            ...obj,
            value: b,
            parsedObject: true
        };
        parentPort.postMessage(parsedJSON);
        process.exit(1); // exit so that we dont keep the thread dangling
    });
}
