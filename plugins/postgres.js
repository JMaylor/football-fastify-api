"use strict";

const fp = require("fastify-plugin");

const environment = process.env.NODE_ENV || "development";

/**
 * This plugin connects to postgres database
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-postgres"), {
    connectionString: process.env.DATABASE_URL,
    ssl: environment == "development" ? null : { rejectUnauthorized: false },
  });
});
