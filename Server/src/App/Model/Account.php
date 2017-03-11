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

    public function musics()
    {
        return $this->hasMany('App\Model\Music');
    }

    public function rooms()
    {
        return $this->belongsToMany('App\Model\Room')->withPivot('dj')->withTimestamps();
    }

    public function votes()
    {
        return $this->hasMany('App\Model\Vote');
    }

    public function messages()
    {
        return $this->hasMany('App\Model\Message');
    }
}
