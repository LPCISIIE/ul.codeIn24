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
        $user = Account::with([
            'rooms' => function ($query) use ($id) {
                $query->where('id', $id);
            }
        ])->where('token', $request->getParam('token'))->first();

        if (null === $user) {
            return $response->withStatus(401);
        }

        $room = Room::with('account')->find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        if ($room->account->id !== $user->id) {
            throw $this->accessDeniedException('Vous n\êtes pas le DJ !');
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
            $music->save();

            $room->music()->associate($music);
            $room->save();

            return $this->ok($response, $music);
        }

        return $this->validationErrors($response);
    }

}