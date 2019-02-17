<?php
// DIC configuration
$container = $app->getContainer();

// PDO database library 
$container['db'] = function ($c) {
  $pdo = new PDO("mysql:host=" . getenv('DB_HOST', 'localhost') . ";dbname=" . getenv('DB_NAME', ''),
  getenv('DB_USER', 'root'), getenv('DB_PASSWORD', ''));
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
  return $pdo;
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};
