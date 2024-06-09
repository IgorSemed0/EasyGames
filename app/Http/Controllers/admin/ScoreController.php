<?php

namespace App\Http\Controllers;

use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function index()
    {
        $scores = Score::all();
        return view('scores.index', compact('scores'));
    }

    public function create()
    {
        return view('scores.create');
    }

    public function store(Request $request)
    {
        // Valida os dados da requisição
        $request->validate([
            'points' => 'required|integer',
            'user_id' => 'required|exists:users,id',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Cria um novo score com os dados validados
        Score::create($request->all());

        // Redireciona para a lista de scores com uma mensagem de sucesso
        return redirect()->route('scores.index')->with('success', 'Score created successfully.');
    }

    public function show(Score $score)
    {
        return view('scores.show', compact('score'));
    }

    public function edit(Score $score)
    {
        return view('scores.edit', compact('score'));
    }

    public function update(Request $request, Score $score)
    {
        // Valida os dados da requisição
        $request->validate([
            'points' => 'required|integer',
            'user_id' => 'required|exists:users,id',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Atualiza os dados do score
        $score->update($request->all());

        // Redireciona para a lista de scores com uma mensagem de sucesso
        return redirect()->route('scores.index')->with('success', 'Score updated successfully.');
    }

    public function destroy(Score $score)
    {
        $score->delete();
        return redirect()->route('scores.index')->with('success', 'Score deleted successfully.');
    }
}
