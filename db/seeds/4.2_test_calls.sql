SELECT * FROM nhl_team;
SELECT * FROM schedule;
SELECT * FROM game_type;
SELECT * FROM game;
SELECT * FROM users;
SELECT * FROM admin;

INSERT INTO admin (name_first, name_last, email, phone) VALUES
('Brad', 'Karulas', 'bkarulas@gmail.com','416-887-3545');

UPDATE game SET act = 0 WHERE id = 1;

SELECT g.id, s.gametime, t.name as type, g.cost, g.box_min as min, g.box_max as max, concat(vis.team_name," @ ",home.team_name) as game
From game g 
INNER JOIN schedule s ON s.id = g.date
INNER JOIN game_type t ON t.id = g.type
INNER JOIN nhl_team vis ON vis.id = s.vis_id
INNER JOIN nhl_team home ON home.id = s.home_id
WHERE admin = 1 AND act = 1 AND g.id = 4;

UPDATE game SET cost=10, box_min=2, box_max=4, type=4 
WHERE id=4 AND admin=1;
