const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    __dirname + '/protos/helloworld.proto',
    {
        // https://github.com/grpc/grpc-node/blob/master/packages/proto-loader/README.md#usage
        keepCase: true, // 필드이름을 유지여부. 기본값은 camelCase로 변경합니다. (Preserve field names. The default is to change them to camel case.)
        longs: String, // 긴값을 나타내는 유형. 기본값은 'Number'입니다. The type to use to represent long values. Defaults to a Long object type.
        enums: String, // enum 을 나타내는 유형.
        defaults: true, // 출력 개체 기본값 설정여부 
        oneofs: true // 가상속성을 현재 필드 이름으로 설정(?)
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