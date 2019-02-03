<?php

require './vendor/autoload.php';
include './config.php';

$app = new Slim\App(["settings" => $config]);
//Handle Dependencies
$container = $app->getContainer();

$container['db'] = function ($c) {
   
  try{
    $db = $c['settings']['db'];
    $options  = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE                      => PDO::FETCH_ASSOC,
    );
    $pdo = new PDO("mysql:host=" . $db['servername'] . ";dbname=" . $db['dbname'],
    $db['username'], $db['password'],$options);
    return $pdo;
  }
  catch(\Exception $ex){
    return $ex->getMessage();
  }

};

$app->options('/{routes:.+}', function ($request, $response, $args) {
  return $response;
});

require './app/budget.php';
require './app/categories.php';
require './app/users.php';

// ALLOW CORS FOR DEVELOPMENT
// TO DELETE AFTER DEVELOPMENT
$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
    ->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});


// ALLOW CORS FOR DEVELOPMENT
// TO DELETE AFTER DEVELOPMENT
// Catch-all route to serve a 404 Not Found page if none of the routes match
// NOTE: make sure this route is defined last
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
  $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
  return $handler($req, $res);
});

$app->run();