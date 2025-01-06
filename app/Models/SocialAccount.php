<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class SocialAccount extends Model
{
    use HasFactory;

    protected $fillable = ["user_id", "vc_provider_name", "vc_provider_id"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
