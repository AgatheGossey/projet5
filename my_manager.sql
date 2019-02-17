-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  sam. 16 fév. 2019 à 13:50
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
(69, '2019-02-19 23:00:00', 'k', 'ChÃ¨que', '4', 'k', 'Depense', 10),
(70, '2019-02-19 23:00:00', 'qsd', 'Virement', '8', 'qsd', 'Recette', 40);

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
(8, 'tccsdfsf');

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
(57, 'ddddfvvffd', 'd', 'd', 'dddddd', 'a@d.fd', 0, 0),
(58, 'dddqsqsdd', 'd', 'd', 'dddddd', 'a@d.fd', 0, 0),
(59, 'ddddfdgd', 'd', 'd', 'dddddd', 'a@d.fd', 0, 0),
(60, 'ddddhhhhdddd', 'd', 'd', 'dddddd', 'a@d.fd', 0, 0),
(61, 'ddzzzddd', 'd', 'd', 'dddddd', 'a@d.fd', 0, 0),
(62, 'dddvvcvdd', 'd', 'd', 'dddddd', 'a@d.fd', 0, 0),
(63, 'Agathe', 'Agathe', 'Gossey', '$2y$10$080YY0oLXeJfV.nhhEOzk.a8KS4Aju0prdbf48QozIwwZkFG/JM1C', 'agathe.gossey@gmail.com', 1, 0),
(64, 'fff', 'Agathe', 'Gossey', '$2y$10$vdb2J1.T1y0dvPknm3AUY.0HS43NEIqjd/v6NiDIkZZ8H3ygjE3mG', 'agathe.gossey@gmail.com', 0, 0),
(66, 'dd', 'dd', 'dd', '$2y$10$roiOxACPOAc8Ki20SOH3LOU30pYRxczwPQf2v7nsuYdTqSUV/koaO', 'd@dd.de', 0, 0),
(67, 'fsdwfsqfq', 'd', 'd', '$2y$10$NEdFxRK2anrDe883ayOGbu1RCUK9JWsAMbHDwzIO8y9Pg150r3NMO', 'd@dd.fr', 0, 0),
(68, 'f', 'f', 'f', '$2y$10$hlmKQwZ6IyciJbqrKQL8AuetXWE7wZK4LxQoA6f3PQL1qz4JwESdK', 'f@ff.fr', 0, 0),
(69, 'tt', 'tt', 'tt', '$2y$10$lrm5OFCxSB67aP6RJA9j0OPFk2Le8wbPUksG0YITtPryrc/u5s41G', 'tt@t.tt', 0, 0),
(70, 'qsd', 'qsd', 'qsd', '$2y$10$KPXcYaiQqGTXpL/w.Nj7Eesc7YzrsGZ3yaJOx4X7MSlFX.Ct9yXva', 'tcc@tcc.tcc', 0, 0),
(71, 'vbn', 'vbn', 'vbn', '$2y$10$8VcIh95noGljZioCoh69eOwQVOhqPoQmh.2s0v.V..A/wPiTDvepq', 'tcc@tcc.tcc', 0, 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
