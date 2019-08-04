CREATE TABLE `aircraft` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `year` int(11) NOT NULL,
 `manufacturer` varchar(255) NOT NULL,
 `model` varchar(255) NOT NULL,
 `aircraftCondition` varchar(10) NOT NULL,
 `serialNumber` varchar(100) NOT NULL,
 `totalTime` float NOT NULL,
 `totalLandings` int(11) NOT NULL,
 `engineType` varchar(50) NOT NULL,
 `engineHours` int(11) NOT NULL,
 `engineCycles` int(11) NOT NULL,
 `adsbEquipped` int(11) NOT NULL,
 `avionics` text NOT NULL,
 `colorScheme` varchar(255) NOT NULL,
 `galley` int(11) NOT NULL,
 `galleyConfig` varchar(255) NOT NULL,
 `lavatory` int(11) NOT NULL,
 `lavatoryConfig` varchar(255) NOT NULL,
 `interior` text NOT NULL,
 `inspection` varchar(255) NOT NULL,
 `numberSeats` int(11) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `username` varchar(50) NOT NULL,
 `email` varchar(150) NOT NULL,
 `passwordHash` varchar(255) NOT NULL,
 `adminUser` int(11),
 PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
 UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
  -- default username is nwtech with the password of nwtech  
  INSERT INTO `users` (`id`, `username`, `email`, `passwordHash`,`adminUser`) VALUES
(1, 'nwtech', 'nwtech@csumb.edu', '$2a$10$B7wXUpVEvGpcm77kJgHnpu2aF/kKNwsJS3swo2wd3wDSbw/SFIIme',1);
  
   INSERT INTO `users` (`id`, `username`, `email`, `passwordHash`,`adminUser`) VALUES
(2, 'nwuser', 'nwuser@csumb.edu', '$2a$10$B7wXUpVEvGpcm77kJgHnpu2aF/kKNwsJS3swo2wd3wDSbw/SFIIme',0);