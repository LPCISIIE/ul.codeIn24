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
}
