<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    protected $table = 'Music';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'title',
        'artist',
        'genre',
        'length',
        'url'
    ];
}
