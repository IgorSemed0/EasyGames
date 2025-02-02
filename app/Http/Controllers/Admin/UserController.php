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
    public function index(Request $request)
    {
        $query = User::with('role');
        
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('vc_name', 'LIKE', "%{$request->search}%")
                  ->orWhere('vc_username', 'LIKE', "%{$request->search}%")
                  ->orWhere('email', 'LIKE', "%{$request->search}%")
                  ->orWhere('vc_hometown', 'LIKE', "%{$request->search}%");
            });
        }
        
        $users = $query->paginate(10)->withQueryString();
        
        return Inertia::render('Admin/User/Index', [
            'users' => $users,
            'filters' => $request->only(['search'])
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
            'vc_hometown' => 'nullable|string|max:255',
            'vc_profile' => 'nullable|string|max:255',
            'role_id' => 'required|exists:roles,id',
            'it_mamba_coins' => 'required|integer|min:0',
        ]);
    
        User::create([
            'vc_name' => $request->vc_name,
            'vc_username' => $request->vc_username,
            'email' => $request->email,
            'vc_gender' => $request->vc_gender,
            'dt_birthday' => $request->dt_birthday,
            'password' => Hash::make($request->password),
            'vc_hometown' => $request->vc_hometown,
            'vc_profile' => $request->vc_profile,
            'role_id' => $request->role_id,
            'it_mamba_coins' => $request->it_mamba_coins,
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
            'vc_hometown' => 'nullable|string|max:255',
            'vc_profile' => 'nullable|string|max:255',
            'role_id' => 'required|exists:roles,id',
            'it_mamba_coins' => 'required|integer|min:0',
            'email_verified_at' => 'nullable|date',
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