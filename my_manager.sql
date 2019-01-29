-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mar. 29 jan. 2019 à 18:22
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
  `date_budget` date NOT NULL,
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
(164, '2019-01-03', 'Agathe', 'ChÃ¨que', '12', 'DÃ©partmenet', 'Depense', 200);

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
(8, 'Diffusion'),
(11, 'Catering'),
(12, 'Subvention');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(29, 'Art Mass and Mess', '$2y$10$8sIXdOq6YIce8nJU7WLwIeKJ37WdvM0BmOif38Nb5iuR.KdMAMvhm', 'agathe'),
(30, '', '$2y$10$sQO4r0bguEol3qe3MXxYjO7zc1QySmCL9YghJdF4cw3GAhWk8oNDS', ''),
(31, '', '$2y$10$pXrIUvtAp8hm/VA3TVojMe4ocX0tp1.KCj0L7rw6HIevbdjuTCrXK', ''),
(32, '', '$2y$10$khB1O9a9kPNcn/oPNH/QReEQjyOXtC9WZnib9a9xEF3H62BcCbPwm', ''),
(33, '', '$2y$10$us5IgntSCsKEz2wkeSv3I.1gkXRUHi3gVXkF1PeecJStDYIxFqWLu', ''),
(34, 'h', '$2y$10$RSQhnyXcmjg68qhFtBp.p.hzND7vt6Qqd5/bARiFoZbf7cywJsJtG', ''),
(35, 'h', '$2y$10$0gnhJtUqVyMIl7l5sagfAuaORfb2cuO9KIKQD10QYeiTHWH0Z0rUi', ''),
(36, 'h', '$2y$10$nrF.GtijREMIJa9Njjy9Y.IeQFFN3ybm9pEDVblpQxXRRqIaay4mG', ''),
(37, 'h', '$2y$10$qNXmAZy/FeqqiIEtza8ZI.zJQV/oNB1obdpTMSh6V0Te1nZMr.Jkm', ''),
(38, 'h', '$2y$10$ApRFkHyJCCwZzlwt4n0l3usFf/6Ggt.hjxmJcNoxutGkVmJm61qpa', ''),
(39, 'h', '$2y$10$5ozclr.MSFfMn4zPAbd/iet6RQcJ.oIcnWZwN6JXIm8XIg4O3B.9m', 'h'),
(40, 'h', '$2y$10$f4rY2XT4ANhO1fmXPlMuS.GT9MPWWZeLt0BR8ZxAap1ishEQ.yMeG', 'h'),
(41, 'h', '$2y$10$few/XM55snL35Ec3o6OkVuVI4AtoWngemf1lBe69LtXZCTktjbnTm', 'h'),
(42, 'h', '$2y$10$mqnkUhSKrZTKUxyAqEbBR.zYbI9ZR3hYB5d70Iogrw2Wx/HATXTkC', 'h'),
(43, 'h', '$2y$10$VuqHJqxzvqJD6MEAHsyzSuE7ItCm0I3gAbjvnfnekoy.loBAk6auC', 'h'),
(44, 'h', '$2y$10$px8Ty1yJMUR.hi.kKEuLZ.BgOX4MLE5G57ElWsWR6CtI39NqS/ALG', 'h'),
(45, '', '$2y$10$O/FD.CKAc1V85E3.jgEpc.pqcmbZSpCU.8zBL6HACrSQnuqFtwUqK', 'hh'),
(46, '', '$2y$10$.gBkr/j0Q8TC7ouUOD4iBOnnqOkZp.f6T/ugWz.A.t4dsu8Fgw4vm', 'hh'),
(47, '', '$2y$10$.JFbevEDHUJCOuYNdgffleGl2H1YYkknO1AKFHBlZugrAbhZlIyi2', 'hh'),
(48, '', '$2y$10$J05WEvHtwEG696YsIlxY1uBvOeEfx0lRc3AmBXp6c3jVnnQ2.9RnK', ''),
(49, '', '$2y$10$9HyCjxQJ7sfDnlm2voImpOIpu2OWHA6LwHNSO1Zc3gyXl.wZleVM2', ''),
(50, '', '$2y$10$J/5.EV7Iy7NSM1QBYjs7w.dmJKci7AohZSHpVkq2TboE3YsIhC8p.', ''),
(51, '', '$2y$10$y.aMM1AUHfLdNFoqCqybcu3pfEu.ZvIArtiCUhQuPO2UBmjpWvRIO', '');

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
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `budget`
--
ALTER TABLE `budget`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
