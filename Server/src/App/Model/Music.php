<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    protected $table = 'music';

    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'artist',
        'genre',
        'length',
        'url'
    ];

    public function room()
    {
        return $this->hasOne('App\Model\Room');
    }

    public function accountRoom()
    {
        return $this->hasMany('App\Model\AccountMusicRoom');
    }
}
