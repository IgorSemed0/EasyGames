<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'challengeDescription'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }}
