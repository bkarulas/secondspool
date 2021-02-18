/*SET GLOBAL time_zone = timezone;
SELECT @@global.time_zone;*/


/*FINAL*/

/*ALL REMAINING LEAF GAMES ---- /api/gameschedule*/
SELECT s.id, s.gametime, h.id as hId, h.full_name as hName, h.team_name as hTeam, h.city_name as hCity, h.short_name as hShort, v.id as vId, v.full_name as vName, v.team_name as vTeam, v.city_name as vCity, v.short_name as vShort
From schedule s 
INNER JOIN nhl_team h ON h.id = s.home_id
INNER JOIN nhl_team v ON v.id = s.vis_id
WHERE s.gametime >= NOW()
ORDER BY s.id;

/*ALL GAME TYPES ---- /api/gametype*/
SELECT * FROM game_type;

/*ALL GAMES CREATED BY AN ADMIN ---- /api/allgames*/
SELECT g.id, s.gametime, t.name as type, g.cost, g.box_min as min, g.box_max as max, concat(vis.team_name," @ ",home.team_name) as game
From game g 
INNER JOIN schedule s ON s.id = g.date
INNER JOIN game_type t ON t.id = g.type
INNER JOIN nhl_team vis ON vis.id = s.vis_id
INNER JOIN nhl_team home ON home.id = s.home_id
WHERE admin = 1 AND act = 1;  /****************************<= ADMIN ID GOES HERE****************************/

/*ONE GAME CALLED BY GAME ID*/
SELECT g.id, s.gametime, t.name as type, g.cost, g.box_min as min, g.box_max as max, concat(vis.team_name," @ ",home.team_name) as game
From game g 
INNER JOIN schedule s ON s.id = g.date
INNER JOIN game_type t ON t.id = g.type
INNER JOIN nhl_team vis ON vis.id = s.vis_id
INNER JOIN nhl_team home ON home.id = s.home_id
WHERE admin = 1 AND act = 1 AND g.id = 4;  /****************************<= ADMIN ID AND GAME ID GOES HERE****************************/
