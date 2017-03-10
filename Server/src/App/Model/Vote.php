<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $table = 'vote';

    protected $primaryKey = 'id';

    protected $fillable = [
        'value'
    ];

    public function room()
    {
        return $this->belongsTo('App\Model\Room');
    }

    public function account()
    {
        return $this->belongsTo('App\Model\Account');
    }
}
