# About

## Intro

Hi, I'm Joe. I made this API because I love football and the web. It is intended to be used by individuals to make projects for their portfolios, or just for fun. I hope you enjoy using the API.

You'll be limited to 30 requests per minute. This is not intended in any way to restrict usage, but it does protect against any malicious attacks and will hopefully keep the server running fast for everyone that wants to use it.

The base url for the data is https://www.api.football.maylor.io.

For example, https://www.api.football.maylor.io/competitions shows a list of all the leagues that are covered by the data. You can find out about the other endpoints below.

If you run into any problems, or want to request any particular endpoints, please e-mail me at joseph@maylor.io - or open an issue on [GitHub](https://github.com/JMaylor/football-fastify-api).

## Data

### Source

The data in this API is sourced from [football-data](https://www.football-data.co.uk/data.php). It covers a total of 278 seasons across 21 European leagues from 11 countries, going back to 2000/01. You can see the leagues that are covered by this API in the Main Leagues section.

### Structure
You can see a diagram of the database [here](https://dbdiagram.io/d/5f720b2f3a78976d7b758e71).

### To-do
* Clean up the referee table. The data source provided multiple names for the same referee (e.g. A Marriner, A. Marriner, Andre Marriner). I will go through these and merge the same referees together. Once this is done, I'll provide endpoints that allow fixtures to be filtered by referee.
* Points deductions. Currently the league tables are calculated from the fixtures included in that season. This is okay for the vast majority of seasons, but where there has been a points deduction, these need to be factored in.

## How to use
You can view the technical swagger documentation [here](https://www.api.football.maylor.io/documentation)

For an idea of how to navigate the data, first navigate to the /competitions endpoint and choose a competition id.

```json{1,4}
# /competitions
[
  {
    "competition_id": 1,
    "competition_name": "english premier league"
  },
  {
    "competition_id": 2,
    "competition_name": "english championship"
  },
  ...
]
```

Go to the seasons endpoint and get all the available seasons for this competition. Choose a season id.

```json{1,12}
# /seasons/1
[
  {
    "season_id": 1,
    "season_name": "09/10",
    "start_date": "2009-08-15",
    "end_date": "2010-05-09",
    "competition_id": 1,
    "competition_name": "english premier league"
  },
  {
    "season_id": 37,
    "season_name": "07/08",
    "start_date": "2007-08-11",
    "end_date": "2008-05-11",
    "competition_id": 1,
    "competition_name": "english premier league"
  },
  ...
]
```

Get the final league table for this season:

```json{1,16}
# /table/37
[
  {
    "team_id": 28,
    "team_name": "Man United",
    "played": 38,
    "won": 27,
    "lost": 5,
    "drawn": 6,
    "gf": 80,
    "ga": 22,
    "gd": 58,
    "points": 87
  },
  {
    "team_id": 15,
    "team_name": "Chelsea",
    "played": 38,
    "won": 25,
    "lost": 3,
    "drawn": 10,
    "gf": 65,
    "ga": 26,
    "gd": 39,
    "points": 85
  },
  ...
]
```

Display the data on your site:

| Team       |   W   |   D   |   L   | Points |
| ---------- | :---: | :---: | :---: | :----: |
| Man United |  27   |   6   |   5   |   87   |
| Chelsea    |  25   |  10   |   3   |   85   |
| ...        |       |       |       |        |

Look at detailed stats for all the fixtures a team played in a particular season.

```json{1}
# /fixtures/37?teamId=15
[
  {
    "away_fouls": 11,
    "away_reds": 0,
    "away_shots": 20,
    "away_shots_on_target": 8,
    "away_team_id": 15,
    "away_team_name": "Chelsea",
    "away_yellows": 1,
    "fixture_date": "2007-09-02",
    "fixture_id": 17802,
    "full_time_away_goals": 0,
    "full_time_home_goals": 2,
    "full_time_result": "H",
    "half_time_away_goals": 0,
    "half_time_home_goals": 0,
    "half_time_result": "D",
    "home_corners": 2,
    "home_fouls": 17,
    "home_reds": 0,
    "home_shots": 9,
    "home_shots_on_target": 5,
    "home_team_id": 2,
    "home_team_name": "Aston Villa",
    "home_yellows": 4,
    "referee_id": 16,
    "referee_name": "M Clattenburg"
  },
  ...
]
```

Get all the fixtures two teams have played against each other in history

```json{1}
# /fixtures/15/28
[
  {
    "away_fouls": 11,
    "away_reds": 0,
    "away_shots": 11,
    "away_shots_on_target": 5,
    "away_team_id": 15,
    "away_team_name": "Chelsea",
    "away_yellows": 1,
    "fixture_date": "2010-04-03",
    "fixture_id": 331,
    "full_time_away_goals": 2,
    "full_time_home_goals": 1,
    "full_time_result": "A",
    "half_time_away_goals": 1,
    "half_time_home_goals": 0,
    "half_time_result": "A",
    "home_corners": 3,
    "home_fouls": 14,
    "home_reds": 0,
    "home_shots": 9,
    "home_shots_on_target": 3,
    "home_team_id": 28,
    "home_team_name": "Man United",
    "home_yellows": 3,
    "referee_id": 17,
    "referee_name": "M Dean"
  },
  ...
]
```

## Technologies
For the database, I chose [PostgreSQL](https://www.postgresql.org/). The server was made with [Fastify](https://www.fastify.io/). These docs are built using [VitePress](https://vitepress.vuejs.org/), and the technical API docs are generated by [Swagger](https://swagger.io/).
