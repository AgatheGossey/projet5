<?php

$app->get('/api/category', function($request, $response) {

  try {
    $connection = $this->db;
    $sql = "SELECT * FROM category";
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

$app->get('/api/category/{id}', function ($request, $response) {

  try {
    $id = $request->getAttribute('id');
    $connection = $this->db;
    $sql = "SELECT * FROM category WHERE id = :id";
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

$app->post('/api/category', function ($request, $response) {

  try {
    $connection = $this->db;
    $sql = "INSERT INTO `category`(`name_category`) VALUES (:name_category)";
    $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $values = array(
        ':name_category' => $request->getParam('name_category'),
    );
    $result = $pre->execute($values);
    return $response->withJson(array('status' => 'Line Created'),200);
  }
  catch(\Exception $ex) {
    return $response->withJson(array('error' => $ex->getMessage()),422);
  }

});

$app->put('/api/category/{id}', function ($request,$response) {
  try {
    $id = $request->getAttribute('id');
    $connection = $this->db;
    $sql = "UPDATE category SET name_category=:name_category WHERE id = :id";
    $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $values = array(
      ':name_category' => $request->getParam('name_category'),
      ':id' => $id
    );
    $result = $pre->execute($values);
    if($result){
      return $response->withJson(array('status' => 'Category Updated'),200);
    } else {
      return $response->withJson(array('status' => 'Category Not Found'),422);
    }
  }
  catch(\Exception $ex) {
      return $response->withJson(array('error' => $ex->getMessage()),422);
  }

});

$app->delete('/api/category/{id}', function ($request, $response) {

  try {
    $id = $request->getAttribute('id');
    $connection = $this->db;
    $sql = "DELETE FROM category WHERE id= :id";
    $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $values = array(':id' => $id);
    $result = $pre->execute($values);
    if($result) {
      return $response->withJson(array('status' => 'Category Deleted'), 200);
    } else {
      return $response->withJson(array('status' => 'Category Not found'), 422);
    }
  }
  catch(\Exception $ex) {
    return $response->withJson(array('error' => $ex->getMessage()),422);
  } 

});