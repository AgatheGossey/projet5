-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Hôte : vincentlqkagap5.mysql.db
-- Généré le :  lun. 18 fév. 2019 à 19:38
-- Version du serveur :  5.6.42-log
-- Version de PHP :  7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `vincentlqkagap5`
--

-- --------------------------------------------------------

--
-- Structure de la table `budget`
--

CREATE TABLE `budget` (
  `id` int(11) NOT NULL,
  `date_budget` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  `mode` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `reason` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `budget`
--

INSERT INTO `budget` (`id`, `date_budget`, `name`, `mode`, `category`, `reason`, `type`, `amount`) VALUES
(81, '2018-12-03 23:00:00', 'Admin', 'Virement', '10', 'DÃ©partement', 'Recette', 5000),
(82, '2019-02-13 23:00:00', 'Admin', 'ChÃ¨que', '12', 'Impression flyers', 'Depense', 150),
(83, '2019-02-04 23:00:00', 'Agat', 'EspÃ¨ce', '11', 'Repas', 'Depense', 210),
(84, '2019-02-08 23:00:00', 'Agat', 'ChÃ¨que', '9', 'Fournitures ', 'Depense', 182),
(85, '2019-01-29 23:00:00', 'ThÃ©o', 'Virement', '10', 'Mairie', 'Recette', 2500),
(86, '2019-02-03 23:00:00', 'ThÃ©o', 'ChÃ¨que', '11', 'T-shirt', 'Depense', 320);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name_category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name_category`) VALUES
(9, 'Divers'),
(10, 'Subvention'),
(11, 'BÃ©nÃ©voles'),
(12, 'Communication'),
(13, 'AdhÃ©sion');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `approved` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `first_name`, `last_name`, `password`, `email`, `approved`, `status`) VALUES
(26, 'Admin', 'Admin', 'Admin', '$2y$10$jCeFrqdhByTaibNLh3hT1uNtuVR2Urfj0ORv4WRo26KIB73HNMq7e', 'admin@admin.admin', 1, 1),
(73, 'Agat', 'Agathe', 'Gossey', '$2y$10$0juko7tDeEk5j1ePNDsZyeOAm7UhsSuvKWWF6ExXD8g6Pmo2LUfY.', 'test@gm.fr', 1, 0),
(74, 'Vince', 'Vincent', 'Lar', '$2y$10$hz6F4iGiKurAyLEznW/9lewj3.ZAVMAkZ5gcu4OZC/.eXP0XTMdyu', 'lar@gm.fr', 0, 0),
(75, 'Mouth', 'Mathilde', 'Taf', '$2y$10$Ny3DfMSSrohUQA9dpL1nTuPhd4xsDCuSxvxzuaB46mhCARPs2ZMtG', 'mat@gm.fr', 0, 0),
(76, 'Thib', 'Thibault', 'Van', '$2y$10$1stlDqNk9UlJ5kQ6xFqORevCOEYLCPdDy2ws6wOqDlmGpZB6O.7nK', 'tihb@gm.fr', 0, 0),
(77, 'ThÃ©o', 'ThÃ©o', 'Taf', '$2y$10$GiwEcHmSFCjNrkG.lo1UFua/bDzqY9X31F/S6oIK8FMZVzb5gPsLy', 'theo@gm.fr', 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `budget`
--
ALTER TABLE `budget`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `budget`
--
ALTER TABLE `budget`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
