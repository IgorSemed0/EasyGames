<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TransactionType;

class TransactionTypeSeeder extends Seeder
{
    public function run()
    {
        $types = [
            ['name' => 'deposit', 'description' => 'Money deposit into account'],
            ['name' => 'withdrawal', 'description' => 'Money withdrawal from account'],
            ['name' => 'reward', 'description' => 'Championship reward'],
            ['name' => 'purchase', 'description' => 'Store purchase'],
            ['name' => 'refund', 'description' => 'Refund from cancelled transaction'],
            ['name' => 'bonus', 'description' => 'System bonus'],
        ];

        foreach ($types as $type) {
            TransactionType::create($type);
        }
    }
}