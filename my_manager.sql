-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 11 fév. 2019 à 22:42
-- Version du serveur :  10.1.37-MariaDB
-- Version de PHP :  7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `my_manager`
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
(60, '2019-01-31 23:00:00', 'Agathe', 'ChÃ¨que', '4', 'Site du samedi', 'Depense', 250),
(61, '2019-02-06 23:00:00', 'Vincent', 'Virement', '3', 'De Lasst', 'Depense', 1000),
(62, '2019-02-20 23:00:00', 'CÃ©cile', 'Virement', '6', 'DÃ©partement', 'Recette', 15000);

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
(3, 'Concert'),
(4, 'DÃ©coration'),
(5, 'Catering'),
(6, 'Subvention');

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
(35, 'Agathe', 'Agathe', 'Gossey', '$2y$10$o35du1XM34Lcs1S15eA0B.8/nJ0gI9.0TSlLOTq.XaKx9Ux.5ZMr6', 'aga@de.fr', 1, 0),
(36, 'CÃ©cile', 'CÃ©cile', 'Deq', '$2y$10$7on9dm3VmTYdCkvqF8GK9.3udO.x4.OdTWg9xIW3YO7lzpFQ2m3Vq', 'cecile@gmail.com', 0, 0),
(37, 'Vince', 'Vincent', 'Lar', '$2y$10$S9qNVYrpkLYkeEk3ru3IjOsVUzDzU1m.sVl8zOjlDoLdI9SlnCHHO', 'vincent@gmail.com', 0, 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
