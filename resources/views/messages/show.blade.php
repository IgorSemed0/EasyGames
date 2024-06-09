<!-- resources/views/admin/message/show.blade.php -->
@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Message Details</h1>
        <p><strong>ID:</strong> {{ $message->id }}</p>
        <p><strong>Chat ID:</strong> {{ $message->chat_id }}</p>
        <p><strong>User ID:</strong> {{ $message->user_id }}</p>
        <p><strong>Content:</strong> {{ $message->content }}</p>
    </div>
@endsection
