/*TESTING*/
drop database if exists hkypool;

create database hkypool;

use hkypool;

SET time_zone = '-05:00';

CREATE TABLE `nhl_team` (
  `id` int UNIQUE PRIMARY KEY NOT NULL,
  `full_name` varchar(255),
  `team_name` varchar(255),
  `city_name` varchar(255),
  `short_name` varchar(255),
  `updated` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `schedule` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `apiId` int(15) DEFAULT NULL,
  `gametime` datetime,
  `home_id` int,
  `vis_id` int,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `admin` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `name_first` varchar(255),
  `name_last` varchar(255),
  `email` varchar(255),
  `phone` varchar(255),
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime
);

CREATE TABLE `users` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `alias` varchar(255),
  `name_first` varchar(255),
  `name_last` varchar(255),
  `email` varchar(255),
  `phone` varchar(255),
  `admin` varchar(255),
  `act` int DEFAULT 1,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime
);

CREATE TABLE `game` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `date` int,
  `cost` decimal(5,2),
  `box_min` int,
  `box_max` int,
  `type` int,
  `admin` varchar(255),
  `act` int DEFAULT 1,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `goals` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `date` int,
  `team` int,
  `period` int,
  `min` int,
  `sec` int,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime
);

CREATE TABLE `game_type` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `about` varchar(255)
);

CREATE TABLE `picks` (
	`id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `sec` int,
    `user` varchar(255),
    `game` int,
    `created` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `paid` (
	`id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `user` varchar(255),
    `game` int,
    `amount` int,
	`updated` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `adminpw` (
    `admin` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
    `pword` varchar(255),
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated` datetime
);

ALTER TABLE `schedule` ADD FOREIGN KEY (`home_id`) REFERENCES `nhl_team` (`id`);

ALTER TABLE `schedule` ADD FOREIGN KEY (`vis_id`) REFERENCES `nhl_team` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`admin`) REFERENCES `admin` (`id`);

ALTER TABLE `game` ADD FOREIGN KEY (`date`) REFERENCES `schedule` (`id`);

ALTER TABLE `game` ADD FOREIGN KEY (`type`) REFERENCES `game_type` (`id`);

ALTER TABLE `goals` ADD FOREIGN KEY (`date`) REFERENCES `schedule` (`id`);

ALTER TABLE `goals` ADD FOREIGN KEY (`team`) REFERENCES `nhl_team` (`id`);

ALTER TABLE `picks` ADD FOREIGN KEY (`user`) REFERENCES `users` (`id`);

ALTER TABLE `picks` ADD FOREIGN KEY (`game`) REFERENCES `game` (`id`);

ALTER TABLE `paid` ADD FOREIGN KEY (`user`) REFERENCES `users` (`id`);

ALTER TABLE `paid` ADD FOREIGN KEY (`game`) REFERENCES `game` (`id`);

ALTER TABLE `adminpw` ADD FOREIGN KEY (`admin`) REFERENCES `admin` (`id`);



INSERT INTO game_type (name, about) VALUES
('First/Last - One Team','The pot gets divided up between the first and last goal of the game by one team'),
('First/Last - Both Teams','The pot gets divided up between the first and last goal of the game by one team'),
('All Goals - One Team', 'Pot gets divided up between all goals scored by one team'),
('All Goals - Both Team', 'Pot gets divided up between all goals scored by both teams'),
('Game Winner','The total pot goes to the game winning goal');

INSERT INTO nhl_team (id, full_name, team_name, city_name, short_name, updated) VALUES
('10','Toronto Maple Leafs','Maple Leafs','Toronto','tor', CURRENT_TIMESTAMP),
('8','Montréal Canadiens','Canadiens','Montréal','mon',CURRENT_TIMESTAMP),
('52','Winnipeg Jets','Jets','Winnipeg','win',CURRENT_TIMESTAMP),
('22','Edmonton Oilers','Oilers','Edmonton','edm',CURRENT_TIMESTAMP),
('23','Vancouver Canucks','Canucks','Vancouver','van',CURRENT_TIMESTAMP),
('20','Calgary Flames','Flames','Calgary','cal',CURRENT_TIMESTAMP),
('9','Ottawa Senators','Senators','Ottawa','ott',CURRENT_TIMESTAMP),
('6','Boston Bruins','Bruins','Boston','bos',CURRENT_TIMESTAMP),
('4','Philadelphia Flyers','Flyers','Philadelphia','phi',CURRENT_TIMESTAMP),
('15','Washington Capitals','Capitals','Washington','was',CURRENT_TIMESTAMP),
('5','Pittsburgh Penguins','Penguins','Pittsburgh','pit',CURRENT_TIMESTAMP),
('1','New Jersey Devils','Devils','New Jersey','nj',CURRENT_TIMESTAMP),
('2','New York Islanders','Islanders','Long Island','nyi',CURRENT_TIMESTAMP),
('3','New York Rangers','Rangers','New York','nyr',CURRENT_TIMESTAMP),
('7','Buffalo Sabres','Sabers','Buffalo','buf',CURRENT_TIMESTAMP),
('14','Tampa Bay Lightning','Lightning','Tampa Bay','tb',CURRENT_TIMESTAMP),
('12','Carolina Hurricanes','Hurricanes','Carolina','car',CURRENT_TIMESTAMP),
('13','Florida Panthers','Panthers','Florida','flo',CURRENT_TIMESTAMP),
('16','Chicago Blackhawks','Blackhawks','Chicago','chi',CURRENT_TIMESTAMP),
('29','Columbus Blue Jackets','Blue Jackets','Columbus','col',CURRENT_TIMESTAMP),
('25','Dallas Stars','Stars','Dallas','dal',CURRENT_TIMESTAMP),
('18','Nashville Predators','Predators','Nashville','nas',CURRENT_TIMESTAMP),
('17','Detroit Red Wings','Red Wings','Detroit','det',CURRENT_TIMESTAMP),
('54','Vegas Golden Knights','Golden Knights','Las Vegas','veg',CURRENT_TIMESTAMP),
('21','Colorado Avalanche','Avalanche','Colorado','col',CURRENT_TIMESTAMP),
('19','St. Louis Blues','Blues','St. Louis','sl',CURRENT_TIMESTAMP),
('24','Anaheim Ducks','Ducks','Anaheim','ana',CURRENT_TIMESTAMP),
('30','Minnesota Wild','Wild','Minnesota','min',CURRENT_TIMESTAMP),
('53','Arizona Coyotes','Coyotes','Arizona','ari',CURRENT_TIMESTAMP),
('28','San Jose Sharks','Sharks','San Jose','sj',CURRENT_TIMESTAMP),
('26','Los Angeles Kings','Kings','Los Angeles','la',CURRENT_TIMESTAMP);

INSERT INTO `schedule` (`id`, `apiId`, `gametime`, `home_id`, `vis_id`, `updated`) VALUES
(1, 2020020408, '2021-03-09 14:00:00', 10, 52, CURRENT_TIMESTAMP),
(2, 2020020422, '2021-03-11 14:00:00', 10, 52, CURRENT_TIMESTAMP),
(3, 2020020438, '2021-03-13 14:00:00', 10, 52, CURRENT_TIMESTAMP),
(4, 2020020443, '2021-03-14 14:00:00', 9, 10, CURRENT_TIMESTAMP),
(5, 2020020480, '2021-03-19 14:00:00', 10, 20, CURRENT_TIMESTAMP),
(6, 2020020490, '2021-03-20 14:00:00', 10, 20, CURRENT_TIMESTAMP),
(7, 2020020521, '2021-03-25 14:00:00', 9, 10, CURRENT_TIMESTAMP),
(8, 2020020536, '2021-03-27 14:00:00', 10, 22, CURRENT_TIMESTAMP),
(9, 2020020551, '2021-03-29 14:00:00', 10, 22, CURRENT_TIMESTAMP),
(10, 2020020566, '2021-03-31 14:30:00', 52, 10, CURRENT_TIMESTAMP),
(11, 2020020581, '2021-04-02 15:00:00', 52, 10, CURRENT_TIMESTAMP),
(12, 2020020603, '2021-04-04 16:00:00', 20, 10, CURRENT_TIMESTAMP),
(13, 2020020608, '2021-04-05 16:30:00', 20, 10, CURRENT_TIMESTAMP),
(14, 2020020622, '2021-04-07 14:30:00', 10, 8, CURRENT_TIMESTAMP),
(15, 2020020646, '2021-04-10 14:00:00', 10, 9, CURRENT_TIMESTAMP),
(16, 2020020660, '2021-04-12 14:00:00', 8, 10, CURRENT_TIMESTAMP),
(17, 2020020669, '2021-04-13 14:30:00', 10, 20, CURRENT_TIMESTAMP),
(18, 2020020682, '2021-04-15 14:00:00', 10, 52, CURRENT_TIMESTAMP),
(19, 2020020697, '2021-04-17 14:00:00', 23, 10, CURRENT_TIMESTAMP),
(20, 2020020710, '2021-04-19 17:00:00', 23, 10, CURRENT_TIMESTAMP),
(21, 2020020726, '2021-04-21 15:00:00', 52, 10, CURRENT_TIMESTAMP),
(22, 2020020741, '2021-04-23 15:00:00', 52, 10, CURRENT_TIMESTAMP),
(23, 2020020749, '2021-04-24 14:00:00', 52, 10, CURRENT_TIMESTAMP),
(24, 2020020775, '2021-04-28 15:00:00', 8, 10, CURRENT_TIMESTAMP),
(25, 2020020792, '2021-04-30 14:00:00', 10, 23, CURRENT_TIMESTAMP),
(26, 2020020806, '2021-05-01 14:00:00', 10, 23, CURRENT_TIMESTAMP),
(27, 2020020819, '2021-05-03 14:00:00', 8, 10, CURRENT_TIMESTAMP),
(28, 2020020833, '2021-05-05 14:00:00', 9, 10, CURRENT_TIMESTAMP),
(29, 2020020847, '2021-05-07 14:00:00', 10, 8, CURRENT_TIMESTAMP),
(30, 2020020862, '2021-05-08 14:00:00', 10, 8, CURRENT_TIMESTAMP);

INSERT INTO admin (id, name_first, name_last, email, phone) VALUES
 ('7d260694-7e27-4bd3-8d34-7a412c199048','Brad', 'Karulas', 'bkarulas@gmail.com','416-887-3545'),
('63160d5d-97a0-4e43-b295-35ab578ca35a', 'Paul', 'Taskas', 'ptaskas@yahoo.com','416-550-7181');

INSERT INTO adminpw (admin, pword) VALUES
('7d260694-7e27-4bd3-8d34-7a412c199048', 'Toronto47'),
('63160d5d-97a0-4e43-b295-35ab578ca35a','Tori10paul');