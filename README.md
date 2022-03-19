# grpc_exmaple
contains the grpc necessary files for demo



============================================================================================================================================================
Local installation and execution
============================================================================================================================================================
1)install docker,python

2)check docker images:-
command : docker images


3)pull the local client docker image for grpc_web  from my repository
command :- docker pull ifzalahmad/grpc_examples:grpc_client_local_v1

4)check docker images to see if the image is donwloaded on the local system
command :- docker images
Note:- image name would be something like "ifzalahmad/grpc_examples"

5)now download the docker server for grpc_web from my repository
command:- docker pull ifzalahmad/grpc_examples:grpc_server_v1
Note:- this server will work on both AWS as well as local system)

6)create a directory envoy:-
mkdir envoy

7)create a file envoy.yaml in file editor of your choice. here i have used nano
command:- touch  envoy.yaml
command:- nano envoy.yaml

8)paste the below code into the file:-
code snip:-

static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address: { address: 0.0.0.0, port_value: 8080 }
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: local_service
              domains: ["*"]
              routes:
              - match: { prefix: "/" }
                route:
                  cluster: greeter_service
                  max_stream_duration:
                    grpc_timeout_header_max: 0s
              cors:
                allow_origin_string_match:
                - prefix: "*"
                allow_methods: GET, PUT, DELETE, POST, OPTIONS
                allow_headers: keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout
                max_age: "1728000"
                expose_headers: custom-header-1,grpc-status,grpc-message
          http_filters:
          - name: envoy.filters.http.grpc_web
          - name: envoy.filters.http.cors
          - name: envoy.filters.http.router
  clusters:
  - name: greeter_service
    connect_timeout: 0.25s
    type: logical_dns
    http2_protocol_options: {}
    lb_policy: round_robin
    load_assignment:
      cluster_name: cluster_0
      endpoints:
        - lb_endpoints:
            - endpoint:
                address:
                  socket_address:
                    address: 0.0.0.0
                    port_value: 9090
					


====================do not copy this line=========================

9) save the file.

10)to run envoy proxy , execute the below command in the same directory as the envoy file :-
command:- docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro --network=host envoyproxy/envoy:v1.20.0


11)to run the grpc_server image use:-
command:- docker run -d -p 9090:9090 ifzalahmad/grpc_examples:grpc_server_v1

12)check the status of docker container executed:-
command:- docker ps
(Note:- it should show tag of the grpc server just run with container id, timings  etc)

13)once the server is successfully running, to run the grpc_client on local system use:-
command :-  docker run -d -p 8081:8081 ifzalahmad/grpc_examples:grpc_client_local_v1

14)Again, check the status of the docker container executed by using command mentioned in step 12.

15)Open up your browser and type "http://localhost:8081" to see the webpage.


========================================
STOP DOCKER SERVICES
=========================================
16)To stop the docker containers running check running containers by using:-
a)Command:- docker ps

Note:- all the running containers will be shown here
copy the container ids for enovy,client and server containers
kill the containers using:-

b))Command :- docker container kill <container_id>
Note:- make sure you kill all three containers relaterd to envoy,client and server

========================================
RERUN DOCKER CONTAINERS
=========================================
docker images only need to run once for respective containers to be created in the system
these containers can be started , stopped, paused and killed depending upon user's requirement instead of creating again.

to list the all containers use:-
Command :- docker containers ls -a

identify the container ids for envoy,client and server

to rerun the containers use:-
Command:- docker container restart <container_id>



==========================================================================================================================================================
AWS RUN 
==========================================================================================================================================================

For AWS you don't need to run server container or envoy proxy container since backend is present on my remote AWS server.

You only need to download AWS grpc client docker image from my repository and run it on your local system.

Note:- make sure all containers related to local run(envoy,server and client) are killed before the aws grpc client run.

1)Download the container from my repository:-
Command:- docker pull ifzalahmad/grpc_examples:aws_grpc_client_v1

2)open docker images to check if it successfully donwloaded:-
Command:- docker images

3)to run the client use :-
Command:- docker run -d -p 8081:8081 ifzalahmad/grpc_examples:aws_grpc_client_v1

4)check if it is successfully running using :-
Command:- docker ps

5)Open up your browser and type "http://localhost:8081" to see the webpage.
