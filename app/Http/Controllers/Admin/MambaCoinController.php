<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use App\Models\Withdrawal;
use App\Models\Reward; // We'll need to create this
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class MambaCoinController extends Controller
{
    public function index(Request $request)
    {
        // Combine deposits
        $deposits = Deposit::with('user')
            ->select(
                'id',
                'user_id',
                
DB::raw("'deposit' as type"),
                'amount_mc as amount',
                'status',
                'notes as description',
                'created_at'
            );

        // Combine withdrawals
        $withdrawals = Withdrawal::with('user')
            ->select(
                'id',
                'user_id',
                DB::raw("'withdrawal' as type"),
                DB::raw('-amount_mc as amount'), // Negative amount for withdrawals
                'status',
                'notes as description',
                'created_at'
            );

        // Combine rewards (we'll need to create this model and migration)
        $rewards = Reward::with('user')
            ->select(
                'id',
                'user_id',
                DB::raw("'reward' as type"),
                'amount_mc as amount',
                'status',
                'description',
                'created_at'
            );

        // Union all queries
        $query = $deposits
            ->union($withdrawals)
            ->union($rewards)
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('vc_username', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            });

        // Get stats
        $stats = [
            'total_deposits' => Deposit::where('status', 'confirmed')->sum('amount_mc'),
            'total_withdrawals' => Withdrawal::where('status', 'processed')->sum('amount_mc'),
            'total_rewards' => Reward::where('status', 'processed')->sum('amount_mc'),
        ];

        return Inertia::render('Admin/MambaCoin/Index', [
            'transactions' => $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'type', 'status']),
            'stats' => $stats,
            'types' => [
                ['id' => 1, 'name' => 'deposit'],
                ['id' => 2, 'name' => 'withdrawal'],
                ['id' => 3, 'name' => 'reward'],
            ]
        ]);
    }
}