<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Championship;
use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ChampionshipController extends Controller
{
    public function index(Request $request)
    {
        $query = Championship::with(['game'])
            ->withCount('participants')
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->game_id, function ($query, $gameId) {
                $query->where('game_id', $gameId);
            })
            ->latest();

        return Inertia::render('Admin/Championship/Index', [
            'championships' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status', 'game_id']),
            'games' => Game::select('id', 'name')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Championship/Create', [
            'games' => Game::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'game_id' => 'required|exists:games,id',
            'game_type' => 'required|in:solo,duo,squad',
            'player_limit' => 'required|integer|min:2',
            'prize_pool' => 'required|numeric|min:0',
            'start_date' => 'required|date|after:now',
            'end_date' => 'required|date|after:start_date',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('championships', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        Championship::create($validated);

        return redirect()->route('admin.championships.index')
            ->with('success', 'Championship created successfully');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Championship/Edit', [
            'championship' => Championship::findOrFail($id),
            'games' => Game::select('id', 'name')->get()
        ]);
    }

    public function update(Request $request, $id)
    {
        $championship = Championship::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'game_id' => 'required|exists:games,id',
            'game_type' => 'required|in:solo,duo,squad',
            'player_limit' => 'required|integer|min:2',
            'prize_pool' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'required|in:pending,active,finished',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($championship->image_url) {
                Storage::delete(str_replace('/storage/', 'public/', $championship->image_url));
            }
            $path = $request->file('image')->store('championships', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $championship->update($validated);

        return redirect()->route('admin.championships.index')
            ->with('success', 'Championship updated successfully');
    }

    public function destroy($id)
    {
        $championship = Championship::findOrFail($id);
        
        if ($championship->image_url) {
            Storage::delete(str_replace('/storage/', 'public/', $championship->image_url));
        }
        
        $championship->delete();

        return redirect()->route('admin.championships.index')
            ->with('success', 'Championship deleted successfully');
    }
}