<?php
$app->post('/budget', function ($request, $response) {

  try {
    $connection = $this->db;
    $sql = "INSERT INTO `budget`(`date_budget`, `name`, `mode`, `category`, `reason`, `type`, `amount`) VALUES (:date_budget,:name,:mode,:category,:reason,:type,:amount)";
    $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $values = array(
        ':date_budget' => $request->getParam('date_budget'),
        ':name' => $request->getParam('name'),
        ':mode' => $request->getParam('mode'),
        ':category' => $request->getParam('category'),
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
    $sql = "SELECT budget.*, category.name_category FROM budget LEFT JOIN category ON budget.category = category.id";
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

$app->put('/budget/{id}', function ($request,$response) {

  try {
    $id = $request->getAttribute('id');
    $connection = $this->db;
    $sql = "UPDATE budget SET date_budget=:date_budget,name=:name,mode=:mode,category=:category,reason=:reason,type=:type,amount=:amount WHERE id = :id";
    $pre = $connection->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $values = array(
      ':date_budget' => $request->getParam('date_budget'),
      ':name' => $request->getParam('name'),
      ':mode' => $request->getParam('mode'),
      ':category' => $request->getParam('category'),
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