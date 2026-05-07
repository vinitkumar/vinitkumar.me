const Module = require("module")

const userlandPunycode = require.resolve("punycode/")
const originalLoad = Module._load

Module._load = function load(request, parent, isMain) {
  if (request === "punycode" || request === "node:punycode") {
    return originalLoad(userlandPunycode, parent, isMain)
  }

  return originalLoad(request, parent, isMain)
}
