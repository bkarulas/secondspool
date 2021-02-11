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
  `gametime` datetime,
  `home_id` int,
  `vis_id` int,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `admin` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name_first` varchar(255),
  `name_last` varchar(255),
  `email` varchar(255),
  `phone` varchar(255),
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime
);

CREATE TABLE `users` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `alias` varchar(255),
  `name_first` varchar(255),
  `name_last` varchar(255),
  `email` varchar(255),
  `phone` varchar(255),
  `admin` int,
  `active` int DEFAULT 1,
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
  `admin` int,
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

ALTER TABLE `schedule` ADD FOREIGN KEY (`home_id`) REFERENCES `nhl_team` (`id`);

ALTER TABLE `schedule` ADD FOREIGN KEY (`vis_id`) REFERENCES `nhl_team` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`admin`) REFERENCES `admin` (`id`);

ALTER TABLE `game` ADD FOREIGN KEY (`date`) REFERENCES `schedule` (`id`);

ALTER TABLE `game` ADD FOREIGN KEY (`type`) REFERENCES `game_type` (`id`);

ALTER TABLE `goals` ADD FOREIGN KEY (`date`) REFERENCES `schedule` (`id`);

ALTER TABLE `goals` ADD FOREIGN KEY (`team`) REFERENCES `nhl_team` (`id`);
