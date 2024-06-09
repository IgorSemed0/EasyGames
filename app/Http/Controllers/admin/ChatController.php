<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        $chats = Chat::all();
        return view('chats.index', compact('chats'));
    }

    public function create()
    {
        return view('chats.create');
    }

    public function store(Request $request)
    {
        // Valida os dados da requisição
        $request->validate([
            'user_id' => 'required|exists:users,id',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Cria um novo chat com os dados validados
        Chat::create($request->all());

        // Redireciona para a lista de chats com uma mensagem de sucesso
        return redirect()->route('chats.index')->with('success', 'Chat created successfully.');
    }

    public function show(Chat $chat)
    {
        return view('chats.show', compact('chat'));
    }

    public function edit(Chat $chat)
    {
        return view('chats.edit', compact('chat'));
    }

    public function update(Request $request, Chat $chat)
    {
        // Valida os dados da requisição
        $request->validate([
            'user_id' => 'required|exists:users,id',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Atualiza os dados do chat
        $chat->update($request->all());

        // Redireciona para a lista de chats com uma mensagem de sucesso
        return redirect()->route('chats.index')->with('success', 'Chat updated successfully.');
    }

    public function destroy(Chat $chat)
    {
        $chat->delete();
        return redirect()->route('chats.index')->with('success', 'Chat deleted successfully.');
    }
}
