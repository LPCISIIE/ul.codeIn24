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
        'album_image',
        'url'
    ];

    public function account()
    {
        return $this->belongsTo('App\Model\Account');
    }

    public function room()
    {
        return $this->belongsTo('App\Model\Room');
    }

    public function playingRoom()
    {
        return $this->hasOne('App\Model\Room');
    }
}
