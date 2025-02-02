<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use DB;

class DepositController extends Controller
{
    public function index(Request $request)
    {
        $query = Deposit::with('user')
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('vc_username', 'like', "%{$search}%")
                        ->orWhere('phone_number', 'like', "%{$search}%");
                })->orWhere('payment_hash', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest();

        return Inertia::render('Admin/MambaCoin/Deposits/Index', [
            'deposits' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function update(Request $request, $id)
    {
        $deposit = Deposit::findOrFail($id);
        
        $request->validate([
            'status' => 'required|in:confirmed,rejected',
            'notes' => 'nullable|string'
        ]);

        DB::transaction(function () use ($deposit, $request) {
            $deposit->status = $request->status;
            $deposit->notes = $request->notes;
            
            if ($request->status === 'confirmed') {
                $deposit->confirmed_at = now();
                $deposit->user->increment('it_mamba_coins', $deposit->amount_mc);
            }
            
            $deposit->save();
        });

        return redirect()->back()->with('success', 'Deposit status updated successfully');
    }
}