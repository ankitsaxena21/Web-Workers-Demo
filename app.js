let worker;

document.addEventListener('DOMContentLoaded', init);

function init(){
    worker = new Worker('web-work.js');
    
    worker.onmessage = (ev) => {
        let data = ev.data;
        console.log(typeof data, data);
        if(typeof data == "number"){
            alert(`The sum is ${data}`)
        }else {
        document.getElementById('output').textContent = data.title;
        }
    }
    
    worker.onerror = (err) => {
        console.log(err.message, err.filename);
    }
    
    document.getElementById('fetchBtn').addEventListener('click', ()=>{
        worker.postMessage({'do':'fetch'});
    })

    document.getElementById('sumBtn').addEventListener('click', ()=> {
      worker.postMessage({'do':'Sum'})
    });
    
    document.getElementById('bgBtn').addEventListener('click', () => {
      if(document.body.style.backgroundColor !== "red") {
        document.body.style.backgroundColor = 'red'
      }else {
        document.body.style.backgroundColor = "lightblue";
      }
    });
}
