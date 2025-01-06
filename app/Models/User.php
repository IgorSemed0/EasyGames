<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens ,HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
     protected $fillable = [
         "vc_name",
         "vc_username",
         "email",
         "vc_gender",
         "dt_email_verified_at",
         "dt_birthday",
         "password",
         "vc_profile",
         "vc_hometown", 
         "vc_role",
         "it_mamba_coins",
     ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    public function socialAccounts()
    {
        return $this->hasMany(SocialAccount::class);
    }

    public function passwordResetToken()
    {
        return $this->hasOne(PasswordResetToken::class, "vc_email", "vc_email");
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
}
