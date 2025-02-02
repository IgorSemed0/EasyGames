<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reward;
use App\Models\Championship;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class RewardController extends Controller
{
    public function index(Request $request)
    {
        $query = Reward::with(['user', 'championship'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('vc_username', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest();

        return Inertia::render('Admin/MambaCoin/Rewards/Index', [
            'rewards' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status']),
            'championships' => Championship::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'championship_id' => 'required|exists:championships,id',
            'amount_mc' => 'required|numeric|min:0',
            'description' => 'required|string'
        ]);

        DB::transaction(function () use ($request) {
            $reward = Reward::create([
                'user_id' => $request->user_id,
                'championship_id' => $request->championship_id,
                'amount_mc' => $request->amount_mc,
                'description' => $request->description,
                'status' => 'pending'
            ]);
        });

        return redirect()->back()->with('success', 'Reward created successfully');
    }

    public function update(Request $request, $id)
    {
        $reward = Reward::findOrFail($id);
        
        $request->validate([
            'status' => 'required|in:processed,rejected',
            'description' => 'nullable|string'
        ]);

        DB::transaction(function () use ($reward, $request) {
            $reward->status = $request->status;
            
            if ($request->description) {
                $reward->description = $request->description;
            }
            
            if ($request->status === 'processed') {
                $reward->processed_at = now();
                $reward->user->increment('it_mamba_coins', $reward->amount_mc);
            }
            
            $reward->save();
        });

        return redirect()->back()->with('success', 'Reward status updated successfully');
    }
}