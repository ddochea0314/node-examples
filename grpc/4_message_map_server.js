const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { platform } = require('os');
// const protobuf = require('google-protobuf/google/protobuf/any_pb.js');

var packageDefinition = protoLoader.loadSync(__dirname + "/protos/mail_template.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: false
})

var mail = grpc.loadPackageDefinition(packageDefinition).mail;

function parseBody(mail, payload) {
    Object.keys(payload).forEach(k => {
        console.log(k);
        if(k){
            mail = mail.replace(`{${k}}`, payload[k]);
        }
    });
    return mail;
}

function registMailTemplate(call, callback) {
    console.log("server:", call.request);
    const parsedbody = parseBody(call.request.mailbody, call.request.payload);
    callback(null, {status : 0, parsedbody })
}

function main() {
    const server = new grpc.Server();
    server.addService(mail.Mail.service, {registMailTemplate});
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    })
}

main();