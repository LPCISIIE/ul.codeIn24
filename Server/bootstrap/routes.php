<?php

use App\Service\RestRouter;

// use App\Middleware\AuthMiddleware;

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
/* $app->post('/register', 'AuthController:register')->setName('register');
$app->post('/login', 'AuthController:login')->setName('login');
$app->post('/auth/refresh', 'AuthController:refresh')->setName('jwt.refresh');
$app->get('/users/me', 'AuthController:me')
    ->add(new AuthMiddleware($container))
    ->setName('users.me'); */

$app->group('/rooms', function () {
    $this->get('', 'RoomController:cget')->setName('get_rooms');

    $this->group('/{id:[0-9]+}', function () {
        $this->get('', 'RoomController:get')->setName('get_room');

        $this->post('/musics', 'RoomMusicController:post')->setName('post_room_music');
        $this->post('/musics/next', 'RoomMusicController:next')->setName('next_room_music');

        $this->get('/accounts', 'RoomAccountController:cget')->setName('get_room_accounts');
        $this->get('/accounts/me', 'RoomAccountController:get')->setName('get_room_account');
        $this->post('/accounts', 'RoomAccountController:post')->setName('post_room_account');
        $this->put('/accounts', 'RoomAccountController:put')->setName('put_room_account');

        $this->post('/votes', 'RoomVoteController:post')->setName('post_room_vote');
    });
});
