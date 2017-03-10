<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    protected $table = 'Music';

    protected $primaryKey = 'id';

    protected $fillable = [
        'title',
        'artist',
        'length',
        'url'
    ];

    public function accountRoom()
    {
        return $this->hasMany('App\Model\AccountMusicRoom');
    }
}
