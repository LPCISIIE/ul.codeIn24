<?php
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table = 'room';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = ['name'];

   public function music() {
       return $this->belongsTo('App\Model\Music');
   }

   public function dj() {
       return $this->belongsTo('App\Model\Account');
   }
}