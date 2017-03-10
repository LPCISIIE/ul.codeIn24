<?php

// Drop all tables
require __DIR__ . '/drop.php';

// Create tables
require __DIR__ . '/auth.php';
require __DIR__ . '/app.php';

// Data
require __DIR__ . '/fixtures.php';
