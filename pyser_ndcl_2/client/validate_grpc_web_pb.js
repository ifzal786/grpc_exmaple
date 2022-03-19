/**
 * @fileoverview gRPC-Web generated client stub for validpack
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.validpack = require('./validate_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.validpack.GreeterClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.validpack.GreeterPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.validpack.HelloRequest,
 *   !proto.validpack.HelloReply>}
 */
const methodDescriptor_Greeter_SayHello = new grpc.web.MethodDescriptor(
  '/validpack.Greeter/SayHello',
  grpc.web.MethodType.UNARY,
  proto.validpack.HelloRequest,
  proto.validpack.HelloReply,
  /**
   * @param {!proto.validpack.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.validpack.HelloReply.deserializeBinary
);


/**
 * @param {!proto.validpack.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.validpack.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.validpack.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.validpack.GreeterClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/validpack.Greeter/SayHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHello,
      callback);
};


/**
 * @param {!proto.validpack.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.validpack.HelloReply>}
 *     Promise that resolves to the response
 */
proto.validpack.GreeterPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/validpack.Greeter/SayHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHello);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.validpack.ValidateClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.validpack.ValidatePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.validpack.validatePayload,
 *   !proto.validpack.validateResponse>}
 */
const methodDescriptor_Validate_validateRequest = new grpc.web.MethodDescriptor(
  '/validpack.Validate/validateRequest',
  grpc.web.MethodType.UNARY,
  proto.validpack.validatePayload,
  proto.validpack.validateResponse,
  /**
   * @param {!proto.validpack.validatePayload} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.validpack.validateResponse.deserializeBinary
);


/**
 * @param {!proto.validpack.validatePayload} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.validpack.validateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.validpack.validateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.validpack.ValidateClient.prototype.validateRequest =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/validpack.Validate/validateRequest',
      request,
      metadata || {},
      methodDescriptor_Validate_validateRequest,
      callback);
};


/**
 * @param {!proto.validpack.validatePayload} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.validpack.validateResponse>}
 *     Promise that resolves to the response
 */
proto.validpack.ValidatePromiseClient.prototype.validateRequest =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/validpack.Validate/validateRequest',
      request,
      metadata || {},
      methodDescriptor_Validate_validateRequest);
};


module.exports = proto.validpack;

