<?php

// GET USERS
// request for get users who are not approved
$app->get('/api/users/approve', function($request, $response) {
  $settings = $this->get('settings'); 

  $token = $request->getAttribute('decoded_token_data');

  if($token['status'] === "1") {
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
  } else {
    return $response->withStatus(403);
  }
});

// request for get all users
$app->get('/api/users', function($request, $response) {
  $settings = $this->get('settings'); 

  $token = $request->getAttribute('decoded_token_data');

  if($token['status'] === "1") {
  try {
    $connection = $this->db;
    $sql = "SELECT * FROM users WHERE approved = 1 AND status = 0";
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
  } else {
    return $response->withStatus(403);
  }
});

// PUT USERS
$app->put('/api/users/check/{id}', function ($request,$response) {
  $settings = $this->get('settings'); 

  $token = $request->getAttribute('decoded_token_data');

  if($token['status'] === "1") {
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
  } else {
    return $response->withStatus(403);
  }
});

// DELETE USERS
$app->delete('/api/users/{id}', function ($request, $response) {
  $settings = $this->get('settings'); 

  $token = $request->getAttribute('decoded_token_data');

  if($token['status'] === "1") {
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
  } else {
    return $response->withStatus(403);
  }
});