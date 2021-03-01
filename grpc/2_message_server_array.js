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

function getOrder1(call, callback) {
    let product_idx = [1,4,5];
    let product_name = ["notebook", "phone", "tablet"];
    let price = [10000, 12300, 3500];
    let user_name = call.request.user_name;

    if(call.request.order_idx == 1) {
        product_idx = [1,2,3];
        product_name = ["notebook", "pc", "printer"];
        price = [10000, 20000, 300];
    }
    callback(null, { product_idx, product_name, price, user_name, user_name });
}

function main() {
    var server = new grpc.Server();
    server.addService(shopping.ShoppingOrder.service, {getOrder1 : getOrder1});
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();