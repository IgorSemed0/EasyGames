<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::all();
        return view('messages.index', compact('messages'));
    }

    public function create()
    {
        return view('messages.create');
    }

    public function store(Request $request)
    {
        // Valida os dados da requisição
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'user_id' => 'required|exists:users,id',
            'content' => 'required|string',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Cria uma nova mensagem com os dados validados
        Message::create($request->all());

        // Redireciona para a lista de mensagens com uma mensagem de sucesso
        return redirect()->route('messages.index')->with('success', 'Message created successfully.');
    }

    public function show(Message $message)
    {
        return view('messages.show', compact('message'));
    }

    public function edit(Message $message)
    {
        return view('messages.edit', compact('message'));
    }

    public function update(Request $request, Message $message)
    {
        // Valida os dados da requisição
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'user_id' => 'required|exists:users,id',
            'content' => 'required|string',
            // Adicione as validações para os outros campos conforme necessário
        ]);

        // Atualiza os dados da mensagem
        $message->update($request->all());

        // Redireciona para a lista de mensagens com uma mensagem de sucesso
        return redirect()->route('messages.index')->with('success', 'Message updated successfully.');
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return redirect()->route('messages.index')->with('success', 'Message deleted successfully.');
    }
}
