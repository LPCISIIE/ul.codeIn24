<?php

$container['AuthController'] = function ($container) {
    return new App\Controller\AuthController($container);
};

$container['RoomAccountController'] = function ($container) {
    return new App\Controller\RoomAccountController($container);
};

$container['MusicController'] = function ($container) {
    return new App\Controller\MusicController($container);
};
