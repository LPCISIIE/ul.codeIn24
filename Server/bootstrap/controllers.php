<?php

$container['AuthController'] = function ($container) {
    return new App\Controller\AuthController($container);
};

$container['RoomController'] = function ($container) {
    return new App\Controller\RoomController($container);
};

$container['RoomAccountController'] = function ($container) {
    return new App\Controller\RoomAccountController($container);
};

$container['RoomVoteController'] = function ($container) {
    return new App\Controller\RoomVoteController($container);
};

$container['RoomMusicController'] = function ($container) {
    return new App\Controller\RoomMusicController($container);
};

$container['RoomMessageController'] = function ($container) {
    return new App\Controller\RoomMessageController($container);
};
