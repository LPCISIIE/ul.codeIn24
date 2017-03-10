<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class AccountMusicRoom extends Model
{
    protected $table = 'account_music_room';

    protected $primaryKey = 'id';

    public $timestamps = false;

    public function account()
    {
        return $this->belongsTo('App\Model\Account');
    }

    public function music()
    {
        return $this->belongsTo('App\Model\Music');
    }

    public function room()
    {
        return $this->belongsTo('App\Model\Room');
    }
}
