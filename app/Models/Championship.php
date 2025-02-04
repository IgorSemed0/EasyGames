<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Championship extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image_url',
        'game_id',
        'game_type',
        'player_limit',
        'prize_pool',
        'start_date',
        'end_date',
        'status'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'prize_pool' => 'decimal:2'
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function participants()
    {
        return $this->hasMany(ChampionshipParticipant::class);
    }

    public function rewards()
    {
        return $this->hasMany(Reward::class);
    }
}