let HyProxy = require("hyproxy");
let hyproxy = new HyProxy();

let sodium = require("sodium-universal");
let { crypto_generichash, crypto_generichash_BYTES } = sodium;

let Key = (string) => {
  let key = Buffer.alloc(crypto_generichash_BYTES);

  crypto_generichash(key, Buffer.from(string));

  let keyString = key.toString("hex");

  return keyString;
};

let Client = (options = {}) => {
  let self = {};

  self.options = options;

  self.connect = (connectionOptions = { ...options }) => {
    return new Promise(async (resolve) => {
      let proxy = await hyproxy.outbound(
        connectionOptions.key,
        connectionOptions.port,
        connectionOptions.host
      );
      resolve({ message: "connected", proxy });
    });
  };

  return self;
};

let Server = (options = {}) => {
  let self = {};

  self.options = options;

  self.listen = (listenOptions = { ...options }) => {
    return new Promise(async (resolve) => {
      let proxy = await hyproxy.inbound(
        listenOptions.key,
        listenOptions.port,
        listenOptions.host
      );
      resolve({ message: "listening", proxy });
    });
  };

  return self;
};

module.exports = { Key, Client, Server };
