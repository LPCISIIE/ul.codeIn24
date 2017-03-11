<?php

namespace App\Controller;

use App\Model\Account;
use App\Model\Message;
use App\Model\Room;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as V;

class RoomMessageController extends Controller
{
    public function cget(Request $request, Response $response, $id)
    {
        $room = Room::with(['messages'])->find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        return $this->ok($response, $room->messages);
    }

    public function post(Request $request, Response $response, $id)
    {
        $room = Room::with(['messages'])->find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        $account = Account::where('token', $request->getParam('token'))->first();

        if (null === $account) {
            throw $this->notFoundException($request, $response);
        }

        $this->validator->validate($request, [
            'body' => V::notBlank()
        ]);

        if ($this->validator->isValid()) {
            $message = new Message([
                'body' => $request->getParam('body')
            ]);

            $message->account()->associate($account);
            $message->room()->associate($room);
            $message->save();

            return $this->ok($response, $message);
        }

        return $this->validationErrors($response);
    }
}