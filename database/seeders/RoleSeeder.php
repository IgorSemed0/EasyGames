<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
        'admin',
        'monitor',
        'moderator',
        'bot',
        'player',
        ];

        foreach ($roles as $role) {
            \App\Models\Role::create(['name' => $role]);
        }
    }
}
