const proto = './proto/filmes.proto'

import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync(proto,{
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const FilmeService = grpc.loadPackageDefinition(packageDefinition).FilmeService
const client = new FilmeService(
    "localhost:9090",
    grpc.credentials.createInsecure()
);

export default client;