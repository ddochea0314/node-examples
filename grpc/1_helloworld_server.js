const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    __dirname + '/protos/helloworld.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld; // proto 파일에 정의한 package 이름

function sayHello(call, callback) {
    callback(null, {message: '안녕! ' + call.request.name})
}

function main() {
    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();