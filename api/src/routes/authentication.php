<?php

use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;
use Respect\Validation\Validator as v;

$usernameValidator = v::length(1, 10);
$nameValidator = v::length(1, 30);
$emailValidator = v::email();
$passwordValidator = v::length(6, 30);

$inscriptionValidator = array(
  'username' => $usernameValidator,
  'first_name' => $nameValidator,
  'last_name' => $nameValidator,
  'email' => $emailValidator,
  'password' => $passwordValidator,
);

// LOGIN
$app->post('/login', function (Request $request, Response $response, array $args) {
  $input = $request->getParsedBody();
  $sql = "SELECT * FROM users WHERE username= :username";
  $sth = $this->db->prepare($sql);
  $sth->bindParam("username", $input['username']);
  $sth->execute();
  $user = $sth->fetchObject();


  if(!$user) {
      return $this->response->withJson(['error' => true, 'message' => 'These credentials do not match our records.']);  
  }

  if (!password_verify($input['password'],$user->password)) {
      return $this->response->withJson(['error' => true, 'message' => 'These credentials do not match our records.']);  
  }
    
  $token = JWT::encode(['id' => $user->id, 'username' => $user->username, 'status' => $user->status], getenv('SECRET_API_KEY', ''), "HS256");

  return $this->response->withJson(['user' => $user, 'token' => $token]);
});

// CREATE USER
$app->post('/register', function ($request, $response) {
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

// CHECK USERNAME
$app->post('/checkUsername', function ($request, $response) {
  try {
    $username = $request->getParam('username');
    $connection = $this->db;
    $sql = "SELECT * FROM users WHERE username = :username";
    $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    
    $values = array(
      ':username' => $username
    );

    $pre->execute($values);
    $result = $pre->fetch();

    return $response->withJson(array('isFree' => !$result), 200);
    
  } catch (\Exception $ex) {
    return $response->withJson(array('error' => $ex->getMessage()),422);
  }
});