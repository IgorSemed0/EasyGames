<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    protected $fillable = [
        'user_id',
        'championship_id',
        'amount_mc',
        'status',
        'description',
        'processed_at'
    ];

    protected $casts = [
        'processed_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function championship()
    {
        return $this->belongsTo(Championship::class);
    }
}