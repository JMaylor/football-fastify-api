"use strict";

const fp = require("fastify-plugin");

const environment = process.env.NODE_ENV || "development";

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-swagger"), {
    swagger: {
      info: {
        title: "Sports Data API",
        description: "An API for Sports Data",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://www.football.maylor.io",
        description: "Read more about this API on my blog.",
      },
      tags: [
        { name: "Healthcheck" },
        { name: "Competitions" },
        { name: "Seasons" },
        { name: "Teams" },
        { name: "Table" },
        { name: "Fixtures" },
      ],
      schemes: environment == "development" ? ["http"] : ["https"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    uiConfig: {
      docExpansion: false,
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
});
