// all the requests are defined in validate_pb.js
//and all the service clients are defined in teh validate_grpc_web_pb.js
//for nore detials and exploratory purposes please view the respective auto generated files


const {HelloRequest, HelloReply,validatePayload,validateResponse} = require('./validate_pb.js');
const {GreeterClient,ValidateClient} = require('./validate_grpc_web_pb.js');

var client = new GreeterClient('http://3.110.158.162:8080');

var client2 = new ValidateClient('http://3.110.158.162:8080');

//create a request for the backend using the function defined in the proto files
var request = new HelloRequest();
//set name is already a predefined function present inside the validate_pb.js
request.setName('World');


//what i wanna do is to create a json obj which will contain some data i want to send to the backend
var json_obj= {
  "employees":[
    {"firstName":"John", "lastName":"Doe","age":"27"},
    {"firstName":"Anna", "lastName":"Smith","age":28},
    {"firstName":"Peter", "lastName":"Jones","age":29}
  ]
  }

  //now i want to stringify it so that it can all be sent as one variable
  var json_payload = JSON.stringify(json_obj);

  //again setMessage is pre generated method  by grpc 
var request2 = new validatePayload();
request2.setMessage(json_payload);

client.sayHello(request, {}, (err, response) => {
  console.log(response.getMessage());
});
//using the client 2 since its mapped to the validate service in the proto file
client2.validateRequest(request2, {}, (err, response) => {
    console.log(response.getMessage());
  });


//exprimental 
//input data 

window.onload = function() {
  //add initial msg to the session storage
  sessionStorage.setItem("json_msg",JSON.stringify(json_obj))

  //add on click functionality to submit button to add the bew data to session storage
  document.getElementById("button").onclick = function fun() {
      alert("hello");
      console.log("button clicked")
      //get all the input from the html form when submit button is clicked!
      var x = document.getElementById("frm1");
      var fname = x.elements.namedItem("fname").value; 
      var lname = x.elements.namedItem("lname").value; 
      var age = parseInt(x.elements.namedItem("age").value); 

      //create a json object from the input
      // json_obj = {
      //   "employees":[
      //     {"firstName":fname, "lastName":lname,"age":age}
        
      //   ]        
      //   }
      //create new employee details and add to the session
      var employee = {"firstName":fname, "lastName":lname,"age":age}
      a = JSON.parse(sessionStorage.getItem("json_msg"));
      a.employees.push(employee)
      sessionStorage.clear()
      json_obj = a
      sessionStorage.setItem("json_msg", JSON.stringify(json_obj))
      
      //use client to send data to backend and get it verified
      document.getElementById("session_verify").onclick = function fun() {
      for (let i = 0; i < sessionStorage.length; i++) {
        //var json_payload = JSON.stringify(json_obj;
        console.log("in verify")
        console.log(sessionStorage.getItem("json_msg"))
        var request2 = new validatePayload();
        request2.setMessage(sessionStorage.getItem("json_msg"));
        client2.validateRequest(request2, {}, (err, response) => {
          console.log(response.getMessage());
        });
        } 
      
    }
      

  }





}
