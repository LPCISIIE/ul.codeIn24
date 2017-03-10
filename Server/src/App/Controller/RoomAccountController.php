<?php

namespace App\Controller;

use App\Model\Account;
use App\Model\Room;
use Firebase\JWT\JWT;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Respect\Validation\Validator as V;

class RoomAccountController extends Controller
{
    public function cget(Request $request, Response $response, $id)
    {
        $room = Room::with('accounts')->find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        return $this->ok($response, $room->accounts);
    }

    public function get(Request $request, Response $response, $id)
    {
        $room = Room::with('accounts')->find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        if (!$request->getParam('token')) {
            return $response->withStatus(401);
        }

        $account = Account::where('token', $request->getParam('token'))->first();

        if (null === $account) {
            throw $this->notFoundException($request, $response);
        }

        return $this->ok($response, $account);
    }

    public function post(Request $request, Response $response, $id)
    {
        $room = Room::find($id);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        if ($request->getParam('token')) {
            $account = Account::where('token', $request->getParam('token'))->first();

            if (null === $account) {
                throw $this->notFoundException($request, $response);
            }

            return $this->ok($response, $account);
        }

        $this->validator->validate($request, [
            'username' => [
                'rules' => V::notBlank(),
                'messages' => [
                    'notBlank' => 'Veuillez choisir un pseudo'
                ]
            ]
        ]);

        $username = $request->getParam('username');

        $account = Account::where('username', $username)->first();

        if ($username && null !== $account) {
            $this->validator->addError('username', 'Le pseudo est déjà utilisé');
        }

        if ($this->validator->isValid()) {
            $account = new Account([
                'username' => $username,
                'token' => $this->generateToken($username)
            ]);

            $account->save();

            $account->rooms()->attach($room);

            return $this->ok($response, $account);
        }

        return $this->validationErrors($response);
    }

    public function put(Request $request, Response $response, $roomId)
    {
        $room = Room::find($roomId);

        if (null === $room) {
            throw $this->notFoundException($request, $response);
        }

        if (!$request->getParam('token')) {
            return $response->withStatus(401);
        }

        $account = Account::where('token', $request->getParam('token'))->first();

        if (null === $account) {
            throw $this->notFoundException($request, $response);
        }

        $this->validator->validate($request, [
            'username' => [
                'rules' => V::notBlank(),
                'messages' => [
                    'notBlank' => 'Veuillez choisir un pseudo'
                ]
            ]
        ]);

        if ($this->validator->isValid()) {
            $account->username = $request->getParam('username');
            $account->save();

            $account->rooms()->updateExistingPivot($roomId, [
                'dj' => $request->getParam('dj') ? true : false
            ]);

            return $this->noContent($response);
        }

        return $this->validationErrors($response);
    }

    private function generateToken($accountName)
    {
        $payload = [
            'iat' => time(),
            'data' => [
                'accountName' => $accountName
            ]
        ];

        return JWT::encode($payload, 'wbhefdqnbjnjnbjrSfn');
    }
}
