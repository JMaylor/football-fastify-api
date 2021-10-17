"use strict";

module.exports = async function (fastify, opts) {
  // fastify.route({
  //   method: "GET",
  //   url: "/",
  //   schema: {
  //     tags: ["seasons"],
  //     description: "Get all seasons",
  //     response: {
  //       200: {
  //         type: "array",
  //         items: {
  //           type: "object",
  //           required: [
  //             "season_id",
  //             "season_name",
  //             "start_date",
  //             "end_date",
  //             "competition_id",
  //             "competition_name",
  //           ],
  //           properties: {
  //             season_id: { type: "integer" },
  //             season_name: { type: "string" },
  //             start_date: {
  //               type: "string",
  //               format: "date",
  //             },
  //             end_date: {
  //               type: "string",
  //               format: "date",
  //             },
  //             competition_id: { type: "integer" },
  //             competition_name: { type: "string" },
  //           },
  //         },
  //       },
  //     },
  //   },
  //   handler: async (_req, reply) => {
  //     const client = await fastify.pg.connect();
  //     const { rows } = await client.query(
  //       `SELECT 
  //         s.season_id,
  //         s.season_name,
  //         s.start_date,
  //         s.end_date,
  //         c.competition_id,
  //         c.competition_name
  //       FROM season s
  //         JOIN competition c
  //           ON s.competition_id = c.competition_id;`
  //     );
  //     client.release();
  //     reply.send(rows);
  //   },
  // });

  fastify.route({
    method: "GET",
    url: "/:competitionId",
    schema: {
      tags: ["seasons"],
      description: "Get all available seasons for a single competition",
      params: {
        competitionId: { type: "integer" },
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            required: [
              "season_id",
              "season_name",
              "start_date",
              "end_date",
              "competition_id",
              "competition_name",
            ],
            properties: {
              season_id: { type: "integer" },
              season_name: { type: "string" },
              start_date: {
                type: "string",
                format: "date",
              },
              end_date: {
                type: "string",
                format: "date",
              },
              competition_id: { type: "integer" },
              competition_name: { type: "string" },
            },
          },
        },
      },
    },
    handler: async (req, reply) => {
      const { competitionId } = req.params;
      const client = await fastify.pg.connect();
      const { rows } = await client.query(
        `SELECT 
          s.season_id,
          s.season_name,
          s.start_date,
          s.end_date,
          c.competition_id,
          c.competition_name
        FROM season s
          JOIN competition c
            ON s.competition_id = c.competition_id
        WHERE c.competition_id = $1;`,
        [competitionId]
      );
      client.release();
      reply.send(rows);
    },
  });
};
