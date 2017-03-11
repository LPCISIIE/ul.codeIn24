<?php

use App\Model\Room;

$rooms = [
    'Room #1',
    'Room #2',
    'Room #3',
    'Room #4'
];

foreach ($rooms as $room) {
    $r = new Room(['name' => $room]);
    $r->save();
}
