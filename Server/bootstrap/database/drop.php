<?php

use Illuminate\Database\Capsule\Manager;

Manager::schema()->dropIfExists('activations');
Manager::schema()->dropIfExists('persistences');
Manager::schema()->dropIfExists('reminders');
Manager::schema()->dropIfExists('role_users');
Manager::schema()->dropIfExists('throttle');
Manager::schema()->dropIfExists('roles');
Manager::schema()->dropIfExists('access_token');
Manager::schema()->dropIfExists('refresh_token');

Manager::schema()->dropIfExists('account_music_room');
Manager::schema()->dropIfExists('account_room');
Manager::schema()->dropIfExists('room');
Manager::schema()->dropIfExists('music');
Manager::schema()->dropIfExists('account');

Manager::schema()->dropIfExists('user');
