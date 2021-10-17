"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/:seasonId",
    schema: {
      tags: ["table"],
      description: "Get the final league table for a season",
      params: {
        seasonId: { type: "integer" },
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            required: [
              "team_name",
              "played",
              "won",
              "lost",
              "drawn",
              "gf",
              "ga",
              "gd",
              "points",
            ],
            properties: {
              team_name: { type: "string" },
              played: { type: "integer" },
              won: { type: "integer" },
              lost: { type: "integer" },
              drawn: { type: "integer" },
              gf: { type: "integer" },
              ga: { type: "integer" },
              gd: { type: "integer" },
              points: { type: "integer" },
            },
          },
        },
      },
    },
    handler: async (req, reply) => {
      const { seasonId } = req.params;
      const client = await fastify.pg.connect();
      const { rows } = await client.query(
        `SELECT *
        FROM league_table($1);`,
        [seasonId]
      );
      client.release();
      reply.send(rows);
    },
  });
};
