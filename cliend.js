let HyVPN = require("./");

let NetworkKey = HyVPN.Key("test-network");
let Client = HyVPN.Client();

Client.connect({ key: NetworkKey }).then(async (res) => console.log(await res));
