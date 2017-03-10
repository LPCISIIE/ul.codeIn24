<?php

use App\Service\RestRouter;

use App\Middleware\AuthMiddleware;

$router = new RestRouter($container['router'], $config['rest']);

/**
 * CORS Pre-flight request
 */
$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

/**
 * Authentication
 */
$app->group('/api', function () use ($container) {
    $this->post('/register', 'AuthController:register')->setName('register');
    $this->post('/login', 'AuthController:login')->setName('login');
    $this->post('/auth/refresh', 'AuthController:refresh')->setName('jwt.refresh');
    $this->get('/users/me', 'AuthController:me')
        ->add(new AuthMiddleware($container))
        ->setName('users.me');
});
