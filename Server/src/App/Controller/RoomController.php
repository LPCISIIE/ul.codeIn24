<?php

namespace App\Controller;

use App\Model\Room;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as V;

class RoomController extends Controller
{
    public function cget(Request $request, Response $response)
    {
        return $this->ok($response, Room::all());
    }

    public function get(Request $request, Response $response, $id)
    {
        $room = Room::with(['music', 'account'])->find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        return $this->ok($response, $room);
    }
}