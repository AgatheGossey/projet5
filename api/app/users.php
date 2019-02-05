<?php

use Respect\Validation\Validator as v;

$usernameValidator = v::alnum()->length(1, 10);
$nameValidator = v::alpha()->length(1, 30);
$emailValidator = v::email();
$passwordValidator = v::length(6, 30);

$inscriptionValidator = array(
  'username' => $usernameValidator,
  'first_name' => $nameValidator,
  'last_name' => $nameValidator,
  'email' => $emailValidator,
  'password' => $passwordValidator,
);

// GET USERS
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

// POST USERS
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

// PUT USERS
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

// DELETE USERS
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