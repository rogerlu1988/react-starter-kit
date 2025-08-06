const { createRequestHandler } = require("@remix-run/netlify");
const build = require("../../build");

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext(event) {
    return {
      env: process.env,
    };
  },
});

exports.handler = handler;
