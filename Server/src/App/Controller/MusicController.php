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
                    $query->where('id', '=', $request->getParam('room_id') );
                }])->get()->dj;

                if ($user->id == $dj) {
                    $music = new Music;
                    $music->fill([
                        'title' => $request->getParam('music_title'),
                        'artist' => $request->getParam('music_artist'),
                        'genre' => $request->getParam('music_genre'),
                        'length' => $request->getParam('music_length'),
                        'url' => $request->getParam('music_url')
                    ])->save();

                    $room = Room::find($request->getParam('room_id'));
                    $room->music()->associate($music);

                }

            }
    }

}