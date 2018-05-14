CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` varchar(511) CHARACTER SET utf8 DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `movies` SET `title` = '复仇者联盟3：无限战争', `cover` = 'https://movies-1256152138.cos.ap-shanghai.myqcloud.com/p2517753454.webp', `category` = '动作 / 科幻 / 奇幻 / 冒险',`description` = '《复仇者联盟3：无限战争》是漫威电影宇宙10周年的历史性集结，将为影迷们带来史诗版的终极对决。面对灭霸突然发起的闪电袭击，复仇者联盟及其所有超级英雄盟友必须全力以赴，才能阻止他对全宇宙造成毁灭性的打击。';
INSERT INTO `movies` SET `title` = '后来的我们', `cover` = 'https://movies-1256152138.cos.ap-shanghai.myqcloud.com/p2519994468.webp', `category` = '剧情 / 爱情', `description` = '这是一个爱情故事，关于一对异乡漂泊的年轻人。十年前，见清和小晓偶然地相识在归乡过年的火车上。两人怀揣着共同的梦想，一起在北京打拼，并开始了一段相聚相离的情感之路。十年后，见清和小晓在飞机上再次偶然重逢……命运似乎是一个轮回。在一次次的偶然下，平行线交叉，再平行，故事始终有“然后”。可后来的他们，学会如何去爱了吗？';
