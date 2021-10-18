"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/:seasonId",
    schema: {
      tags: ["fixtures"],
      description: "Get all the fixtures a club played in a season.",
      params: {
        seasonId: { type: "integer" },
      },
      querystring: {
        type: "object",
        properties: {
          teamId: { type: "integer" },
        },
        required: ["teamId"],
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            required: [
              "away_corners",
              "away_fouls",
              "away_reds",
              "away_shots",
              "away_shots_on_target",
              "away_team_id",
              "away_team_name",
              "away_yellows",
              "fixture_date",
              "fixture_id",
              "full_time_away_goals",
              "full_time_home_goals",
              "full_time_result",
              "half_time_away_goals",
              "half_time_home_goals",
              "half_time_result",
              "home_corners",
              "home_fouls",
              "home_reds",
              "home_shots",
              "home_shots_on_target",
              "home_team_id",
              "home_team_name",
              "home_yellows",
              "referee_id",
              "referee_name",
            ],
            properties: {
              away_fouls: { type: "integer" },
              away_reds: { type: "integer" },
              away_shots: { type: "integer" },
              away_shots_on_target: { type: "integer" },
              away_team_id: { type: "integer" },
              away_team_name: { type: "string" },
              away_yellows: { type: "integer" },
              fixture_date: {
                type: "string",
                format: "date",
              },
              fixture_id: { type: "integer" },
              full_time_away_goals: { type: "integer" },
              full_time_home_goals: { type: "integer" },
              full_time_result: { type: "string" },
              half_time_away_goals: { type: "integer" },
              half_time_home_goals: { type: "integer" },
              half_time_result: { type: "string" },
              home_corners: { type: "integer" },
              home_fouls: { type: "integer" },
              home_reds: { type: "integer" },
              home_shots: { type: "integer" },
              home_shots_on_target: { type: "integer" },
              home_team_id: { type: "integer" },
              home_team_name: { type: "string" },
              home_yellows: { type: "integer" },
              referee_id: { type: "integer" },
              referee_name: { type: "string" },
            },
          },
        },
      },
    },
    handler: async (req, reply) => {
      const { teamId } = req.query;
      const { seasonId } = req.params;
      const client = await fastify.pg.connect();
      const { rows } = await client.query(
        `SELECT f.fixture_id,
          f.home_team  home_team_id,
          ht.team_name home_team_name,
          f.away_team  away_team_id,
          at.team_name away_team_name,
          f.fixture_date,
          f.full_time_home_goals,
          f.full_time_away_goals,
          f.full_time_result,
          f.half_time_home_goals,
          f.half_time_away_goals,
          f.half_time_result,
          f.referee    referee_id,
          r.referee_name,
          f.home_shots,
          f.away_shots,
          f.home_shots_on_target,
          f.away_shots_on_target,
          f.home_fouls,
          f.away_fouls,
          f.home_corners,
          f.away_corners,
          f.home_yellows,
          f.away_yellows,
          f.home_reds,
          f.away_reds
        FROM fixture f
          JOIN team ht ON f.home_team = ht.team_id
          JOIN team at ON f.away_team = at.team_id
          LEFT JOIN referee r ON f.referee = r.referee_id
        WHERE f.season = $1
          AND (f.home_team = $2 OR f.away_team = $2);`,
        [seasonId, teamId]
      );
      client.release();
      reply.send(rows);
    },
  });

  fastify.route({
    method: "GET",
    url: "/versus/:teamOne/:teamTwo",
    schema: {
      tags: ["fixtures"],
      description:
        "Get all the fixtures two teams have played against each other.",
      params: {
        teamOne: { type: "integer" },
        teamTwo: { type: "integer" },
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            required: [
              "away_corners",
              "away_fouls",
              "away_reds",
              "away_shots",
              "away_shots_on_target",
              "away_team_id",
              "away_team_name",
              "away_yellows",
              "fixture_date",
              "fixture_id",
              "full_time_away_goals",
              "full_time_home_goals",
              "full_time_result",
              "half_time_away_goals",
              "half_time_home_goals",
              "half_time_result",
              "home_corners",
              "home_fouls",
              "home_reds",
              "home_shots",
              "home_shots_on_target",
              "home_team_id",
              "home_team_name",
              "home_yellows",
              "referee_id",
              "referee_name",
            ],
            properties: {
              away_fouls: { type: "integer" },
              away_reds: { type: "integer" },
              away_shots: { type: "integer" },
              away_shots_on_target: { type: "integer" },
              away_team_id: { type: "integer" },
              away_team_name: { type: "string" },
              away_yellows: { type: "integer" },
              fixture_date: {
                type: "string",
                format: "date",
              },
              fixture_id: { type: "integer" },
              full_time_away_goals: { type: "integer" },
              full_time_home_goals: { type: "integer" },
              full_time_result: { type: "string" },
              half_time_away_goals: { type: "integer" },
              half_time_home_goals: { type: "integer" },
              half_time_result: { type: "string" },
              home_corners: { type: "integer" },
              home_fouls: { type: "integer" },
              home_reds: { type: "integer" },
              home_shots: { type: "integer" },
              home_shots_on_target: { type: "integer" },
              home_team_id: { type: "integer" },
              home_team_name: { type: "string" },
              home_yellows: { type: "integer" },
              referee_id: { type: "integer" },
              referee_name: { type: "string" },
            },
          },
        },
      },
    },
    handler: async (req, reply) => {
      const { teamOne, teamTwo } = req.params;
      const client = await fastify.pg.connect();
      const { rows } = await client.query(
        `SELECT f.fixture_id,
          f.home_team  home_team_id,
          ht.team_name home_team_name,
          f.away_team  away_team_id,
          at.team_name away_team_name,
          f.fixture_date,
          f.full_time_home_goals,
          f.full_time_away_goals,
          f.full_time_result,
          f.half_time_home_goals,
          f.half_time_away_goals,
          f.half_time_result,
          f.referee    referee_id,
          r.referee_name,
          f.home_shots,
          f.away_shots,
          f.home_shots_on_target,
          f.away_shots_on_target,
          f.home_fouls,
          f.away_fouls,
          f.home_corners,
          f.away_corners,
          f.home_yellows,
          f.away_yellows,
          f.home_reds,
          f.away_reds
        FROM fixture f
          JOIN team ht ON f.home_team = ht.team_id
          JOIN team at ON f.away_team = at.team_id
          LEFT JOIN referee r ON f.referee = r.referee_id
        WHERE (f.home_team = $1 AND f.away_team = $2)
          OR (f.home_team = $2 AND f.away_team = $1);`,
        [teamOne, teamTwo]
      );
      client.release();
      reply.send(rows);
    },
  });
};
