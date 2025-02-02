<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Deposit extends Model
{
    protected $fillable = [
        'user_id',
        'amount_kz',
        'amount_mc',
        'payment_hash',
        'status',
        'phone_number',
        'notes',
        'confirmed_at'
    ];

    protected $casts = [
        'confirmed_at' => 'datetime'
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($deposit) {
            $deposit->payment_hash = strtoupper(Str::random(8));
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}