let HyVPN = require("./");

let NetworkKey = HyVPN.Key("test-network");
let Server = HyVPN.Server();

Server.listen({ key: NetworkKey, port: 3000, host: "localhost" }).then(
  async (res) => console.log(await res)
);
