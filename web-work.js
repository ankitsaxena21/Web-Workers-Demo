self.addEventListener("message", (ev) => {
  console.log('Web worker started with data: ', ev);
  let data = ev.data.do;
  switch (data) {
    case "Sum":
      let sum = 0;
      for (let i = 0; i < 1000000000; i++) {
        sum += i;
      }
      self.postMessage(sum);
      break;
    case "Other":
      self.postMessage("Other task...");
      break;
    case "fetch":
      let url = "http://jsonplaceholder.typicode.com/posts";
      console.log("about to do the fetch for the data");

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          self.postMessage(data[0]);
        })
        .catch((err) => console.log(err));

      break;
    default:
      console.log("Invalid access");
      self.postMessage("Closing web worker");
      self.close();
  }
});
