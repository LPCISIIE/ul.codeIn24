<?php

namespace App\Controller;

use App\Model\Account;
use App\Model\Music;
use Cartalyst\Sentinel\Checkpoints\ThrottlingException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as V;

class MusicController extends Controller
{
    public function playMusic(Request $request, Response $response)
    {
        if ($request->isPost()) {
            $user = Account::find($request->token);
            // Check if the token is valid
            if ($user != null) {
                $dj = Account::with(['rooms' => function ($query) {
                    $query->where('id', '=', $request->getParam('room.id') );
                }])->get()->dj;

                if ($user->id == $dj) {
                    $music = new Music;
                    $music->fill([
                        'title' => $request->getParam('music.title'),
                        'artist' => $request->getParam('music.artist'),
                        'genre' => $request->getParam('music.genre'),
                        'length' => $request->getParam('music.length'),
                        'url' => $request->getParam('music.url')
                    ])->save();

                    $room = Room::find($request->getParam('room.id'));
                    $room->musicId = $music->id;

                }

            }
    }

}