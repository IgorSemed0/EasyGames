<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class WithdrawalController extends Controller
{
    public function index(Request $request)
    {
        $query = Withdrawal::with('user')
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('vc_username', 'like', "%{$search}%")
                        ->orWhere('phone_number', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest();

        return Inertia::render('Admin/MambaCoin/Withdrawals/Index', [
            'withdrawals' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function update(Request $request, $id)
    {
        $withdrawal = Withdrawal::findOrFail($id);
        
        $request->validate([
            'status' => 'required|in:processed,rejected',
            'notes' => 'nullable|string'
        ]);

        DB::transaction(function () use ($withdrawal, $request) {
            $withdrawal->status = $request->status;
            $withdrawal->notes = $request->notes;
            
            if ($request->status === 'processed') {
                $withdrawal->processed_at = now();
            } elseif ($request->status === 'rejected' && $withdrawal->status === 'pending') {
                // Refund the MambaCoins if the withdrawal is rejected
                $withdrawal->user->increment('it_mamba_coins', $withdrawal->amount_mc);
            }
            
            $withdrawal->save();
        });

        return redirect()->back()->with('success', 'Withdrawal status updated successfully');
    }
}