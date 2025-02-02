<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionType extends Model
{
    protected $fillable = ['name', 'description'];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}