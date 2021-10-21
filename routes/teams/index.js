"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["Teams"],
      description: "Get all teams",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            required: ["team_id", "team_name"],
            properties: {
              team_id: { type: "integer" },
              team_name: { type: "string" },
            },
          },
        },
      },
    },
    handler: async (_req, reply) => {
      const client = await fastify.pg.connect();
      const { rows } = await client.query(
        `SELECT 
          team_id,
          team_name
        FROM team;`
      );
      client.release();
      reply.send(rows);
    },
  });

  fastify.route({
    method: "GET",
    url: "/:seasonId",
    schema: {
      tags: ["Teams"],
      description: "Get all teams involved in a season",
      params: {
        seasonId: { type: "integer" },
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            required: ["team_id", "team_name"],
            properties: {
              team_id: { type: "integer" },
              team_name: { type: "string" },
            },
          },
        },
      },
    },
    handler: async (req, reply) => {
      const { seasonId } = req.params;
      const client = await fastify.pg.connect();
      const { rows } = await client.query(
        `SELECT
          DISTINCT(f.home_team) team_id, t.team_name
        FROM fixture f
          JOIN team t on f.home_team = t.team_id
        WHERE f.season = $1;`,
        [seasonId]
      );
      client.release();
      reply.send(rows);
    },
  });
};
