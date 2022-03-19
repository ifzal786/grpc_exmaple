const {HelloRequest, HelloReply,validatePayload,validateResponse} = require('./validate_pb.js');
const {GreeterClient,ValidateClient} = require('./validate_grpc_web_pb.js');

var client = new GreeterClient('http://localhost:8080');

var client2 = new ValidateClient('http://localhost:8080');


var request = new HelloRequest();
request.setName('World');

var request2 = new validatePayload();
request2.setMessage('World2');

client.sayHello(request, {}, (err, response) => {
  console.log(response.getMessage());
});

client2.validateRequest(request, {}, (err, response) => {
    console.log(response.getMessage());
  });