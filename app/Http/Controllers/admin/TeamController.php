<?php

// app/Http/Controllers/TeamController.php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::all();
        return view('teams.index', compact('teams'));
    }

    public function create()
    {
        return view('teams.create');
    }

    public function store(Request $request)
    {
        // Valida os dados da requisição
        $request->validate([
            'name' => 'required|string|max:255|unique:teams',
        ]);

        // Cria uma nova equipe com os dados validados
        Team::create($request->only('name'));

        // Redireciona para a lista de equipes com uma mensagem de sucesso
        return redirect()->route('teams.index')->with('success', 'Team created successfully.');
    }

    public function show(Team $team)
    {
        return view('teams.show', compact('team'));
    }

    public function edit(Team $team)
    {
        return view('teams.edit', compact('team'));
    }

    public function update(Request $request, Team $team)
    {
        // Valida os dados da requisição
        $request->validate([
            'name' => 'required|string|max:255|unique:teams,name,' . $team->id,
        ]);

        // Atualiza os dados da equipe
        $team->update($request->only('name'));

        // Redireciona para a lista de equipes com uma mensagem de sucesso
        return redirect()->route('teams.index')->with('success', 'Team updated successfully.');
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return redirect()->route('teams.index')->with('success', 'Team deleted successfully.');
    }
}
