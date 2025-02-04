<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChampionshipParticipant;
use App\Models\Championship;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChampionshipParticipantController extends Controller
{
    public function index(Request $request, $championship_id)
    {
        $championship = Championship::findOrFail($championship_id);
        
        $query = ChampionshipParticipant::with(['user'])
            ->where('championship_id', $championship_id)
            ->when($request->search, function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('vc_username', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest();

        return Inertia::render('Admin/ChampionshipParticipant/Index', [
            'championship' => $championship,
            'participants' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'championship_id' => 'required|exists:championships,id',
            'user_id' => 'required|exists:users,id',
            'team_name' => 'nullable|string|max:255'
        ]);

        // Check if user is already registered
        $exists = ChampionshipParticipant::where('championship_id', $validated['championship_id'])
            ->where('user_id', $validated['user_id'])
            ->exists();

        if ($exists) {
            return back()->with('error', 'User is already registered for this championship');
        }

        // Check if championship is full
        $championship = Championship::findOrFail($validated['championship_id']);
        if ($championship->participants()->count() >= $championship->player_limit) {
            return back()->with('error', 'Championship is full');
        }

        ChampionshipParticipant::create($validated);

        return back()->with('success', 'Participant added successfully');
    }

    public function update(Request $request, $id)
    {
        $participant = ChampionshipParticipant::findOrFail($id);
        
        $validated = $request->validate([
            'team_name' => 'nullable|string|max:255',
            'placement' => 'nullable|integer|min:1',
            'is_paid' => 'boolean'
        ]);

        $participant->update($validated);

        return back()->with('success', 'Participant updated successfully');
    }

    public function destroy($id)
    {
        $participant = ChampionshipParticipant::findOrFail($id);
        $participant->delete();

        return back()->with('success', 'Participant removed successfully');
    }
}