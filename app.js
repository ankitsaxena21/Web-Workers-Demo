let worker;

document.addEventListener('DOMContentLoaded', init);

function init(){
    worker = new Worker('web-work.js');
    worker.addEventListener('message', workerMessaged);
    worker.addEventListener('error', workerError);
    
    //worker.postMessage('Get Started');
    
    document.querySelector('h1').addEventListener('click', ()=>{
        //send another message to the worker
        //worker.postMessage('Other');
        worker.postMessage({'do':'fetch'});
    })

    document.getElementById('sumBtn').addEventListener('click', ()=> {
      worker.postMessage({'do':'Sum'})
      // let sum = 0;
      // for(let i = 0; i< 10000000000; i++) {
      //   sum += i;
      // }
      // alert(`The sum is ${sum}`)
    });
    
    document.getElementById('bgBtn').addEventListener('click', () => {
      if(document.body.style.backgroundColor !== "green") {
        document.body.style.backgroundColor = 'green'
      }else {
        document.body.style.backgroundColor = "blue";
      }
    });
}

function workerMessaged(ev){
    let data = ev.data;
    console.log(typeof data, data);
    if(typeof data == "number"){
      alert(`The sum is ${data}`)
    }else {
      document.getElementById('output').textContent = data.title;
    }
}

function workerError(err){
    console.log(err.message, err.filename);
}