<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'account';

    protected $primaryKey = 'id';

    protected $fillable = [
        'username',
        'token'
    ];

    public function rooms()
    {
        return $this->belongsToMany('App\Model\Room')->withPivot('dj');
    }

    public function roomMusic()
    {
        return $this->hasMany('App\Model\AccountMusicRoom');
    }

    public function votes()
    {
        return $this->hasMany('App\Model\Vote');
    }
}
