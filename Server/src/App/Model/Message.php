<?php
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'message';

    protected $primaryKey = 'id';

    protected $fillable = ['body'];

    public function room()
    {
        return $this->belongsTo('App\Model\Room');
    }

    public function account()
    {
        return $this->belongsTo('App\Model\Account');
    }
}
