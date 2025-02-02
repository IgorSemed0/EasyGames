<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Role;

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
         "email_verified_at",
         "dt_birthday",
         "password",
         "vc_profile",
         "vc_hometown", 
         "role_id",
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
            'dt_birthday' => 'date:Y-m-d',
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
    
    /**
     * Find user by username or email
     *
     * @param string $login
     * @return \App\Models\User|null
     */
     public static function findForLogin($login)
    {
        return static::where('email', $login)
            ->orWhere('vc_username', $login)
            ->first();
    }
    
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
    
    public function hasRole(string $role): bool
    {
        return $this->role?->name === $role;
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
    
    public function createTransaction($type, $amount, $description = null, $metadata = null)
    {
        return DB::transaction(function () use ($type, $amount, $description, $metadata) {
            $transaction = $this->transactions()->create([
                'transaction_type_id' => $type,
                'amount' => $amount,
                'status' => 'pending',
                'description' => $description,
                'metadata' => $metadata
            ]);
    
            return $transaction;
        });
    }

}
