<?php

namespace App\Http\Controllers;

use App\Models\Guild;
use Illuminate\Http\Request;

class GuildController extends Controller
{
    public function index()
    {
        $guilds = Guild::all();
        return view('guilds.index', compact('guilds'));
    }

    public function create()
    {
        return view('guilds.create');
    }

    public function store(Request $request)
    {
        // Valida os dados da requisição
        $request->validate([
            'name' => 'required|string|max:255|unique:guilds',
            'description' => 'nullable|string',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Cria uma nova guilda com os dados validados
        Guild::create($request->all());

        // Redireciona para a lista de guildas com uma mensagem de sucesso
        return redirect()->route('guilds.index')->with('success', 'Guild created successfully.');
    }

    public function show(Guild $guild)
    {
        return view('guilds.show', compact('guild'));
    }

    public function edit(Guild $guild)
    {
        return view('guilds.edit', compact('guild'));
    }

    public function update(Request $request, Guild $guild)
    {
        // Valida os dados da requisição
        $request->validate([
            'name' => 'required|string|max:255|unique:guilds,name,' . $guild->id,
            'description' => 'nullable|string',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Atualiza os dados da guilda
        $guild->update($request->all());

        // Redireciona para a lista de guildas com uma mensagem de sucesso
        return redirect()->route('guilds.index')->with('success', 'Guild updated successfully.');
    }

    public function destroy(Guild $guild)
    {
        $guild->delete();
        return redirect()->route('guilds.index')->with('success', 'Guild deleted successfully.');
    }
}

