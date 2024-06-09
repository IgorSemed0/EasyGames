<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    public function index()
    {
        $challenges = Challenge::all();
        return view('challenges.index', compact('challenges'));
    }

    public function create()
    {
        return view('challenges.create');
    }

    public function store(Request $request)
    {
        // Valida os dados da requisição
        $request->validate([
            'name' => 'required|string|max:255|unique:challenges',
            'description' => 'nullable|string',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Cria um novo desafio com os dados validados
        Challenge::create($request->all());

        // Redireciona para a lista de desafios com uma mensagem de sucesso
        return redirect()->route('challenges.index')->with('success', 'Challenge created successfully.');
    }

    public function show(Challenge $challenge)
    {
        return view('challenges.show', compact('challenge'));
    }

    public function edit(Challenge $challenge)
    {
        return view('challenges.edit', compact('challenge'));
    }

    public function update(Request $request, Challenge $challenge)
    {
        // Valida os dados da requisição
        $request->validate([
            'name' => 'required|string|max:255|unique:challenges,name,' . $challenge->id,
            'description' => 'nullable|string',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Atualiza os dados do desafio
        $challenge->update($request->all());

        // Redireciona para a lista de desafios com uma mensagem de sucesso
        return redirect()->route('challenges.index')->with('success', 'Challenge updated successfully.');
    }

    public function destroy(Challenge $challenge)
    {
        $challenge->delete();
        return redirect()->route('challenges.index')->with('success', 'Challenge deleted successfully.');
    }
}
