<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChampionshipParticipant extends Model
{
    protected $fillable = [
        'championship_id',
        'user_id',
        'team_name',
        'placement',
        'is_paid'
    ];

    protected $casts = [
        'is_paid' => 'boolean'
    ];

    public function championship()
    {
        return $this->belongsTo(Championship::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}