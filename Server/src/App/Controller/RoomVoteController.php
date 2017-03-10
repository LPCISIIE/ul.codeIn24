<?php

namespace App\Controller;

use App\Model\Account;
use App\Model\Room;
use App\Model\Vote;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as V;

class RoomVoteController extends Controller
{
    public function post(Request $request, Response $response, $id)
    {
        $room = Room::find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        $account = Account::where('token', $request->getParam('token'))->first();

        if (null === $account) {
            return $response->withStatus(401);
        }

        $vote = Vote::where('account_id', $account->id)->where('room_id', $id)->first();

        if (null === $vote) {
            $vote = new Vote([
                'value' => $request->getParam('value') ? true : false
            ]);

            $vote->room()->associate($vote);
        } else {
            $vote->value = $request->getParam('value') ? true : false;
        }

        $vote->save();

        return $this->ok($response, $vote);
    }
}
