"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["competitions"],
      description: "Get all competitions",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            required: ["competition_id", "competition_name"],
            properties: {
              competition_id: { type: "integer" },
              competition_name: { type: "string" },
            },
          },
        },
      },
    },
    handler: async (_req, reply) => {
      const client = await fastify.pg.connect();
      const { rows } = await client.query(`SELECT * FROM competition;`);
      client.release();
      reply.send(rows);
    },
  });
};
