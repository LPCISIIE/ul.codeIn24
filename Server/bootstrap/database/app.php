<?php

use Illuminate\Database\Capsule\Manager;
use Illuminate\Database\Schema\Blueprint;

Manager::schema()->create('account', function (Blueprint $table) {
    $table->increments('id');
    $table->string('username');
    $table->string('token')->unique();
    $table->timestamps();
});
