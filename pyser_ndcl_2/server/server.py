from concurrent import futures
import logging

import grpc
import validate_pb2
import validate_pb2_grpc
import json

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
        result = validate_msg(request)
        #return the instance of message class you defined in the service
        return validate_pb2.validateResponse(message='Hello, validating, validating the %s! these are invalid fields'  % result)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ##map services to the classes
    validate_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    validate_pb2_grpc.add_ValidateServicer_to_server(Validate(), server)
    server.add_insecure_port('[::]:9090')
    server.start()
    server.wait_for_termination()


def validate_msg(request):
    json_load = json.loads(request.message)
    print("inside validate_msg func.. printing json_load: ", json_load)
    invalid_list=[]
    
    for i in range(len(json_load['employees'])):
        print(i)
        print(json_load['employees'][i])
        obj = json_load['employees'][i]
        valid_data = ''
        invalid_field  = []
        if (type(obj['firstName'])!=str):
            valid_data = False
            invalid_field.append({'firstName':obj['firstName']})
        if (type(obj['lastName'])!=str):
            valid_data = False
            invalid_field.append({'lastName':obj['lastName']})
        if (type(obj['age'])!=int):
            valid_data = False
            invalid_field.append({'age':obj['age']})
        invalid_list.append({i:invalid_field})
    return invalid_list


if __name__ == '__main__':
    logging.basicConfig()
    serve()