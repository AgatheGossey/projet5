<?php

use Respect\Validation\Validator as v;

$usernameValidator = v::length(1, 10);

$inscriptionValidator = array(
  'username' => $usernameValidator,
);

// USERS OPERATIONS

// request for get users who are not approved
$app->get('/users/approve', function($request, $response) {
  try {
    $connection = $this->db;
    $sql = "SELECT * FROM users WHERE approved = 0";
    $result = null;

    foreach ($connection->query($sql) as $row) {
      $result[] = $row;
    }
    if ($result) {
      return $response->withJson(array('status' => 'true','result'=>$result), 200);
    }
  }
    catch (\Exception $ex) {
        return $response->withJson(array('error' => $ex->getMessage()), 422);
    }
});

// request for get all users
$app->get('/users', function($request, $response) {
  try {
    $connection = $this->db;
    $sql = "SELECT * FROM users";
    $result = null;

    foreach ($connection->query($sql) as $row) {
      $result[] = $row;
    }
    if ($result) {
      return $response->withJson(array('status' => 'true','result'=>$result), 200);
    }
  }
    catch (\Exception $ex) {
        return $response->withJson(array('error' => $ex->getMessage()), 422);
    }
});


$app->post('/users', function ($request, $response) {
  if ($request->getAttribute('has_errors')) {
    $errors = $request->getAttribute('errors');

    return $response->withJSON(array('errors' => $errors), 400);
  } else {
    try {
      $connection = $this->db;
      $sql = "INSERT INTO `users`(`username`, `first_name`, `last_name`, `password`, `email`) VALUES (:username,:first_name,:last_name,:password,:email)";
      $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $values = array(
        ':username' => $request->getParam('username'),
        ':first_name' => $request->getParam('first_name'),
        ':last_name' => $request->getParam('last_name'),
        ':email' => $request->getParam('email'),
        //Using hash for password encryption
        'password' => password_hash($request->getParam('password'),PASSWORD_DEFAULT)
      );
      $result = $pre->execute($values);
      return $response->withJson(array('status' => 'User Created'),200);
    }
    catch(\Exception $ex) {
      return $response->withJson(array('error' => $ex->getMessage()),422);
    }
  }
})->add(new \DavidePastore\Slim\Validation\Validation($inscriptionValidator));

$app->put('/users/check/{id}', function ($request,$response) {
  
  try {
    $id = $request->getAttribute('id');
    $connection = $this->db;
    $sql = "UPDATE users SET approved=1 WHERE id = :id";
    $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $values = array(
      ':id' => $id
    );
    $result = $pre->execute($values);
    if($result){
      return $response->withJson(array('status' => 'User Approved'),200);
    } else {
      return $response->withJson(array('status' => 'User Not Found'),422);
    }
  }
  catch(\Exception $ex) {
      return $response->withJson(array('error' => $ex->getMessage()),422);
  }

});

$app->delete('/users/{id}', function ($request, $response) {

  try {
    $id = $request->getAttribute('id');
    $connection = $this->db;
    $sql = "DELETE FROM users WHERE id= :id";
    $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $values = array(':id' => $id);
    $result = $pre->execute($values);
    if($result) {
      return $response->withJson(array('status' => 'User Deleted'), 200);
    } else {
      return $response->withJson(array('status' => 'User Not found'), 422);
    }
  }
  catch(\Exception $ex) {
    return $response->withJson(array('error' => $ex->getMessage()),422);
  } 

});