<?php
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table = 'room';

    protected $primaryKey = 'id';

    protected $fillable = ['name'];

    public function accounts()
    {
        return $this->belongsToMany('App\Model\Account')->withPivot('dj')->withTimestamps();
    }

    public function accountMusic()
    {
        return $this->hasMany('App\Model\AccountMusicRoom');
    }

   public function music()
   {
       return $this->belongsTo('App\Model\Music');
   }

   public function account()
   {
       return $this->belongsTo('App\Model\Account');
   }

   public function votes()
   {
       return $this->hasMany('App\Model\Vote');
   }
}
