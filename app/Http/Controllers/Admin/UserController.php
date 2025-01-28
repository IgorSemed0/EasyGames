<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')->paginate(10);
        return Inertia::render('Admin/User/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = Role::all();
        return Inertia::render('Admin/User/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'vc_name' => 'required|string|max:255',
            'vc_username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'vc_gender' => 'required|string|in:male,female,other',
            'dt_birthday' => 'required|date',
            'password' => ['required', Rules\Password::defaults()],
            'role_id' => 'required|exists:roles,id',
            'it_mamba_coins' => 'required|integer|min:0'
        ]);

        User::create([
            'vc_name' => $request->vc_name,
            'vc_username' => $request->vc_username,
            'email' => $request->email,
            'vc_gender' => $request->vc_gender,
            'dt_birthday' => $request->dt_birthday,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'it_mamba_coins' => $request->it_mamba_coins
        ]);

        return redirect()->route('admin.user.index')->with('success', 'User created successfully');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        $roles = Role::all();
        
        return Inertia::render('Admin/User/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'vc_name' => 'required|string|max:255',
            'vc_username' => 'required|string|max:255|unique:users,vc_username,' . $id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'vc_gender' => 'required|string|in:male,female,other',
            'dt_birthday' => 'required|date',
            'role_id' => 'required|exists:roles,id',
            'it_mamba_coins' => 'required|integer|min:0'
        ]);

        $user->update($request->all());

        return redirect()->route('admin.user.index')->with('success', 'User updated successfully');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('admin.user.index')->with('success', 'User deleted successfully');
    }
}