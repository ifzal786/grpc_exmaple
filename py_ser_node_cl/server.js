var PROTO_PATH = __dirname + '/validate.proto';

var assert = require('assert');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var helloworld = protoDescriptor.helloworld;

function doSayHello(call, callback) {
  callback(null, {
    message: 'Hello! ' + call.request.name
  });
}

function validatedata(call, callback) {
    callback(null, {
      message: 'Hello! validating ' + call.request.message
    });
  }
  

function getServer() {
  var server = new grpc.Server();
  server.addService(helloworld.Greeter.service, {
    sayHello: doSayHello,
  });
  server.addService(helloworld.Validate.service, {
    validateRequest: validatedata,
  });
  server
  return server;
}

if (require.main === module) {
  var server = getServer();
  server.bindAsync(
    '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
      assert.ifError(err);
      server.start();
  });
}

exports.getServer = getServer;