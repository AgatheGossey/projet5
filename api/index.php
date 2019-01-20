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


// BUDGET OPERATIONS

$app->post('/budget', function ($request, $response) {

    try {
        $connection = $this->db;
        $sql = "INSERT INTO `budget`(`date`, `name`, `mode`, `reason`, `type`, `amount`) VALUES (:date,:name,:mode,:reason,:type,:amount)";
        $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $values = array(
            ':date' => $request->getParam('date'),
            ':name' => $request->getParam('name'),
            ':mode' => $request->getParam('mode'),
            ':reason' => $request->getParam('reason'),
            ':type' => $request->getParam('type'),
            ':amount' => $request->getParam('amount'));
        $result = $pre->execute($values);
        return $response->withJson(array('status' => 'Line Created'),200);
    }
    catch(\Exception $ex) {
        return $response->withJson(array('error' => $ex->getMessage()),422);
    }

});

$app->get('/budget/{id}', function ($request, $response) {

    try {
        $id = $request->getAttribute('id');
        $connection = $this->db;
        $sql = "SELECT * FROM budget WHERE id = :id";
        $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $values = array(
            ':id' => $id);
        $pre->execute($values);
        $result = $pre->fetch();
        if($result) {
            return $response->withJson(array('status' => 'true','result'=> $result),200);
        } else {
            return $response->withjson(array('status' => 'Line Not Found'), 422);
        }
    }
    catch (\Exception $ex) {
        return $response->withJson(array('error' => $ex->getMessage()),422);
    }

});

$app->get('/budget', function($request, $response) {

    try {
        $connection = $this->db;
        $sql = "SELECT * FROM budget";
        $result = null;

        foreach ($connection->query($sql) as $row) {
            $result[] = $row;
        }

        if ($result) {
            return $response->withJson(array('status' => 'true','result'=>$result), 200);
        } else{
            return $response->withJson(array('status' => 'Operations Not Found'), 422);
        }

    }
    catch (\Exception $ex) {
        return $response->withJson(array('error' => $ex->getMessage()), 422);
    }

});

$app->put('/budget/{id}', function ($request,$response) {

    try {
        $id = $request->getAttribute('id');
        $connection = $this->db;
        $sql = "UPDATE budget SET date=:date,name=:name,mode=:mode,reason=:reason,type=:type,amount=:amount WHERE id = :id";
        $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $values = array(
            ':date' => $request->getParam('date'),
            ':name' => $request->getParam('name'),
            ':mode' => $request->getParam('mode'),
            ':reason' => $request->getParam('reason'),
            ':type' => $type->getParam('type'),
            ':amount' => $request->getParam('amount'),
            ':id' => $id
        );
        $result = $pre->execute($values);
        if($result){
            return $response->withJson(array('status' => 'User Updated'),200);
        } else {
            return $response->withJson(array('status' => 'User Not Found'),422);
        }
    }
    catch(\Exception $ex) {
        return $response->withJson(array('error' => $ex->getMessage()),422);
    }

});

$app->delete('/budget/{id}', function ($request, $response) {

    try {
        $id = $request->getAttribute('id');
        $connection = $this->db;
        $sql = "DELETE FROM budget WHERE id= :id";
        $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $values = array(':id' => $id);
            $result = $pre->execute($values);
            if($result) {
                return $response->withJson(array('status' => 'Operations Deleted'), 200);
            } else {
                return $response->withJson(array('status' => 'Operations Not found'), 422);
            }
    }
    catch(\Exception $ex) {
        return $response->withJson(array('error' => $ex->getMessage()),422);
    } 

});

// USERS OPERATIONS

$app->post('/user', function ($request, $response) {

    try {
        $connection = $this->db;
        $sql = "INSERT INTO `users`(`username`, `password`, `email`) VALUES (:username,:password,:email)";
        $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $values = array(
            ':username' => $request->getParam('username'),
            ':password' => $request->getParam('password'),
            ':email' => $request->getParam('email'),
        $result = $pre->execute($values);
        return $response->withJson(array('status' => 'Line Created'),200);
    }
    catch(\Exception $ex) {
        return $response->withJson(array('error' => $ex->getMessage()),422);
    }

});

$app->delete('/user/{id}', function ($request, $response) {

    try {
        $id = $request->getAttribute('id');
        $connection = $this->db;
        $sql = "DELETE FROM users WHERE id= :id";
        $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $values = array(':id' => $id);
            $result = $pre->execute($values);
            if($result) {
                return $response->withJson(array('status' => 'Operations Deleted'), 200);
            } else {
                return $response->withJson(array('status' => 'Operations Not found'), 422);
            }
    }
    catch(\Exception $ex) {
        return $response->withJson(array('error' => $ex->getMessage()),422);
    } 

});


// ALLOW CORS FOR DEVELOPMENT
// TO DELETE AFTER DEVELOPMENT
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
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