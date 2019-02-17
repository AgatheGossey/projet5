<?php

// Application middleware

// MIDDLEWARE FOR AUTHENTICATION
$app->add(new \Tuupola\Middleware\JwtAuthentication([
    "path" => "/api",
    "attribute" => "decoded_token_data",
    "secret" => getenv('SECRET_API_KEY', ''),
    "algorithm" => ["HS256"],
    "error" => function ($response, $arguments) {
      $data["status"] = "error";
      $data["message"] = $arguments["message"];
      return $response
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
$app->add(function ($req, $res, $next) {
  $response = $next($req, $res);
  return $response
    ->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
