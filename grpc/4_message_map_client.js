const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// const protobuf = require('google-protobuf/google/protobuf');

var packageDefinition = protoLoader.loadSync(__dirname + "/protos/mail_template.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

var mail = grpc.loadPackageDefinition(packageDefinition).mail;

function main() {
    const client = new mail.Mail('localhost:50051', grpc.credentials.createInsecure());
    
    const payload = {
        name : "ddochea",
        date : new Date().toUTCString()
    }
    client.RegistMailTemplate({
        name : "name", 
        mailbody : "hello {name}! \r\nnice to meet you.\r\n date : {date}", 
        payload
    }, function (err, res) {
        console.log("client:", res);
    });
}

main();