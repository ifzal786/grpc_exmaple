from concurrent import futures
import logging

import grpc
import validate_pb2
import validate_pb2_grpc

##define the classes same as the service names inheriting from grpc servicer classes
class Greeter(validate_pb2_grpc.GreeterServicer):

    #define the function you called in the service
    def SayHello(self, request, context):
        print(request.name)
        #return the instance of message class you defined in the service
        return validate_pb2.HelloReply(message='Hello, %s!' % request.name)


##define the classes same as the service names inheriting from grpc servicer classes
class Validate(validate_pb2_grpc.ValidateServicer):

    def validateRequest(self, request, context):
        print(request.message)
        #return the instance of message class you defined in the service
        return validate_pb2.validateResponse(message='Hello, validating %s!' % request.message)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ##map services to the classes
    validate_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    validate_pb2_grpc.add_ValidateServicer_to_server(Validate(), server)
    server.add_insecure_port('[::]:9090')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()