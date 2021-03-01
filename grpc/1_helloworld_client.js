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

function main() {
    const client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());
    client.sayHello({name: 'you'}, function(err, res) {
        console.log('Greeting:', res.message);
    });
}

main();