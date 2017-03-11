<?php

namespace App\Controller;

use App\Model\Account;
use App\Model\Music;
use App\Model\Room;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as V;

class MusicController extends Controller
{
    public function post(Request $request, Response $response, $id)
    {
        $user = Account::where('token', $request->getParam('token'))->first();

        if (null === $user) {
            return $response->withStatus(401);
        }

        $room = Room::with([
            'accounts' => function ($query) use ($user) {
                $query->where('id', $user->id);
            }
        ])->find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        if (!$room->accounts->first() || !$room->accounts->first()->pivot->dj) {
            throw $this->accessDeniedException('You must be a DJ !');
        }

        $this->validator->validate($request, [
            'title' => [
                'rules' => V::notBlank(),
                'messages' => [
                    'notBlank' => 'Le titre est requis'
                ]
            ],
            'url' => [
                'rules' => V::notBlank(),
                'messages' => [
                    'notBlank' => 'L\'url est requise'
                ]
            ]
        ]);

        if ($this->validator->isValid()) {
            $music = new Music([
                'title' => $request->getParam('title'),
                'artist' => $request->getParam('artist'),
                'genre' => $request->getParam('genre'),
                'length' => $request->getParam('length'),
                'url' => $request->getParam('url')
            ]);

            $music->account()->associate($room->accounts->first());
            $music->room()->associate($room);
            $music->save();

            return $this->ok($response, $music);
        }

        return $this->validationErrors($response);
    }

}