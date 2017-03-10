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
$app->post('/register', 'AuthController:register')->setName('register');
$app->post('/login', 'AuthController:login')->setName('login');
$app->post('/auth/refresh', 'AuthController:refresh')->setName('jwt.refresh');
$app->get('/users/me', 'AuthController:me')
    ->add(new AuthMiddleware($container))
    ->setName('users.me');

$app->get('/rooms', 'RoomController:cget')->setName('get_rooms');
$app->get('/rooms/{id}', 'RoomController:get')->setName('get_room');

$app->post('/rooms/{id}/musics', 'MusicController:post')->setName('post_room_music');

$app->get('/rooms/{id}/accounts', 'RoomAccountController:cget')->setName('get_room_accounts');
$app->get('/rooms/{id}/accounts/me', 'RoomAccountController:get')->setName('get_room_account');
$app->post('/rooms/{id}/accounts', 'RoomAccountController:post')->setName('post_room_account');
$app->put('/rooms/{id}/accounts', 'RoomAccountController:put')->setName('put_room_account');

$app->post('/rooms/{id}/votes', 'RoomVoteController:post')->setName('post_room_vote');
