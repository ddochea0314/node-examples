const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

var path = __dirname + "/protos/shopping_order.proto";

var packageDefinition = protoLoader.loadSync(path, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

var shopping = grpc.loadPackageDefinition(packageDefinition).shopping;

function main() {
    const client = new shopping.ShoppingOrder('localhost:50051', grpc.credentials.createInsecure());
    client.GetOrder2({order_idx : 1}, function(err, res) {
        console.log("client", res);
    });
}

main();