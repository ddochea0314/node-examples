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

function getOrder2(call, callback) {
    const products = [{
        product_idx : 1,
        product_name : "notebook",
        price : 10000
    },
    {
        product_idx : 2,
        product_name : "pc",
        price : 20000
    },
    {
        product_idx : 3,
        product_name : "printer",
        price : 300
    }];
    const user_name = call.request.user_name;
    callback(null, { products, user_name });
}

function main() {
    var server = new grpc.Server();
    server.addService(shopping.ShoppingOrder.service, {getOrder2 : getOrder2});
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();