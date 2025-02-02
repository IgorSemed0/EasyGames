<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\TransactionType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MambaCoinController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaction::with(['user', 'transactionType'])
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

        return Inertia::render('Admin/MambaCoin/Index', [
            'transactions' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status']),
            'transactionTypes' => TransactionType::all()
        ]);
    }

    public function processTransaction(Request $request, Transaction $transaction)
    {
        $request->validate([
            'status' => 'required|in:processed,rejected'
        ]);

        DB::transaction(function () use ($transaction, $request) {
            $transaction->status = $request->status;
            $transaction->save();

            if ($request->status === 'processed') {
                $user = $transaction->user;
                $user->increment('it_mamba_coins', $transaction->amount);
            }
        });

        return redirect()->back()->with('success', 'Transaction processed successfully');
    }
}