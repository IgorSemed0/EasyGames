<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'vc_name' => fake()->name(),
            'vc_username' => fake()->unique()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'vc_gender' => fake()->randomElement(['M', 'F', 'Other']),
            'dt_birthday' => fake()->date('Y-m-d', '-18 years'),
            'password' => static::$password ??= Hash::make('password'),
            'vc_hometown' => fake()->city(),
            'vc_profile' => fake()->imageUrl(),
            'role_id' => 5,
            'it_mamba_coins' => 5,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    // Método opcional para criar um admin
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role_id' => 1,
            'it_mamba_coins' => 1000,
        ]);
    }
}
