"use strict";

const fp = require("fastify-plugin");

/**
 * This plugin limits requests by IP
 * https://github.com/fastify/fastify-rate-limit
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-rate-limit"), {
    max: 30,
    timeWindow: 60000,
  });
});
