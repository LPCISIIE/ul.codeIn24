<?php

namespace App\Controller;

use App\Exception\AccessDeniedException;
use App\Model\Account;
use App\Model\Music;
use Cartalyst\Sentinel\Checkpoints\ThrottlingException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as V;

class MusicController extends Controller
{
    public function addMusic(Request $request, Response $response)
    {
        if ($request->isPost()) {
            $user = Account::with(['rooms' => function($query) use($request) {
                $query->where('id', $request->getParam('room_id') );
            }])->where('token', $request->getParam('token'))->first();

            if ($user != null) {
                $room = Room::find($request->getParam('room_id'));
                if ($room->dj() == $user) {
                    $music = new Music;
                    $music->fill([
                        'title' => $request->getParam('music_title'),
                        'artist' => $request->getParam('music_artist'),
                        'genre' => $request->getParam('music_genre'),
                        'length' => $request->getParam('music_length'),
                        'url' => $request->getParam('music_url')
                    ])->save();
                    $room->music()->associate($music);
                    return $response->withStatus('200');
                }

            } else {
              return $response->withStatus('401','You are not the dj');
            }
        }
    }

}