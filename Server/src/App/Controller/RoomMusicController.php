<?php

namespace App\Controller;

use App\Model\Account;
use App\Model\Music;
use App\Model\Room;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as V;

class RoomMusicController extends Controller
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
            'title' => V::notBlank(),
            'url' => V::notBlank()
        ]);

        if ($this->validator->isValid()) {
            $music = new Music([
                'title' => $request->getParam('title'),
                'artist' => $request->getParam('artist'),
                'album' => $request->getParam('album'),
                'album_image' => $request->getParam('album_image'),
                'url' => $request->getParam('url')
            ]);

            $music->account()->associate($room->accounts->first());
            $music->room()->associate($room);
            $music->save();

            return $this->ok($response, $music);
        }

        return $this->validationErrors($response);
    }

    public function next(Request $request, Response $response, $id)
    {
        $room = Room::with(['account', 'music'])->find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        $dj = $room->account;
        $music = $room->music;

        $nextMusic = $dj ? $dj->musics()->where('created_at', '>', $music->created_at)->first() : null;

        if (null !== $nextMusic) {
            $room->music()->associate($nextMusic);
            $room->save();
        } else {
            if ($dj) {
                $djWithPivot = $room->accounts()->where('id', $dj->id)->first();
                $nextDJs = $room->accounts()->wherePivot('dj', true)->wherePivot('created_at', '>', $djWithPivot->pivot->created_at)->get();
            } else {
                $nextDJs = $room->accounts()->wherePivot('dj', true)->get();
            }

            foreach ($nextDJs as $DJ) {
                if($dj) {
                    $nextMusic = $DJ->musics()->where('created_at', '>', $music->created_at)->first();
                }
                else {
                    $nextMusic = $DJ->musics()->first();
                }

                if (null !== $nextMusic) {
                    $room->account()->associate($DJ);
                    $room->music()->associate($nextMusic);
                    $room->save();

                    return $this->ok($response, $room);
                }
            }

            return $this->noContent($response);
        }

        return $this->ok($response, $nextMusic);
    }
}