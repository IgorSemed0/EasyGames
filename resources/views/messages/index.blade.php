<!-- resources/views/admin/message/index.blade.php -->
@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Messages</h1>
        <a href="{{ route('admin.message.create') }}" class="btn btn-primary mb-3">Create Message</a>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Chat ID</th>
                    <th>User ID</th>
                    <th>Content</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($messages as $message)
                    <tr>
                        <td>{{ $message->id }}</td>
                        <td>{{ $message->chat_id }}</td>
                        <td>{{ $message->user_id }}</td>
                        <td>{{ $message->content }}</td>
                        <td>
                            <a href="{{ route('admin.message.show', $message->id) }}" class="btn btn-primary">View</a>
                            <a href="{{ route('admin.message.edit', $message->id) }}" class="btn btn-success">Edit</a>
                            <form action="{{ route('admin.message.destroy', $message->id) }}" method="POST" style="display: inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
