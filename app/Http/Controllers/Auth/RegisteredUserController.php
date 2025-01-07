<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
     public function store(Request $request): RedirectResponse
     {
         $request->validate([
             'vc_name' => 'required|string|max:255',
             'vc_username' => 'required|string|max:255|unique:'.User::class,
             'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
             'vc_gender' => 'required|string|in:male,female,other',
             'dt_birthday' => 'required|date',
             'password' => ['required', 'confirmed', Rules\Password::defaults()],
             'vc_hometown' => 'nullable|string|max:255',
         ]);
     
         $user = User::create([
             'vc_name' => $request->vc_name,
             'vc_username' => $request->vc_username,
             'email' => $request->email,
             'vc_gender' => $request->vc_gender,
             'dt_birthday' => $request->dt_birthday,
             'password' => Hash::make($request->password),
             'vc_hometown' => $request->vc_hometown,
         ]);
     
         event(new Registered($user));
     
         Auth::login($user);
     
         return redirect(route('dashboard', absolute: false));
     }
}
