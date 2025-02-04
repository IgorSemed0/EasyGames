<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $query = Game::query()
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest();

        return Inertia::render('Admin/Game/Index', [
            'games' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Game/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:games',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('games', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        Game::create($validated);

        return redirect()->route('admin.games.index')
            ->with('success', 'Game created successfully');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Game/Edit', [
            'game' => Game::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $game = Game::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:games,name,' . $id,
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image')) {
            if ($game->image_url) {
                Storage::delete(str_replace('/storage/', 'public/', $game->image_url));
            }
            $path = $request->file('image')->store('games', 'public');
            $validated['image_url'] = Storage::url($path);
        }

        $game->update($validated);

        return redirect()->route('admin.games.index')
            ->with('success', 'Game updated successfully');
    }

    public function destroy($id)
    {
        $game = Game::findOrFail($id);
        
        if ($game->image_url) {
            Storage::delete(str_replace('/storage/', 'public/', $game->image_url));
        }
        
        $game->delete();

        return redirect()->route('admin.games.index')
            ->with('success', 'Game deleted successfully');
    }
}