<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        
        // Criar usuário admin
        User::factory()->create([
            'vc_name' => 'Administrator',
            'vc_username' => 'admin',
            'email' => 'percynoronin@gmail.com',
            'role_id' => 1,
            'it_mamba_coins' => 1000,
            'password' => bcrypt('12345678'),
        ]);

        // Criar usuário de teste
        User::factory()->create([
            'vc_name' => 'Test User',
            'vc_username' => 'test',
            'email' => 'test@example.com',
        ]);

        // Criar 10 usuários aleatórios
        // User::factory(10)->create();
    }
}