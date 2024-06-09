<!-- resources/views/admin/message/edit.blade.php -->
@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Edit Message</h1>
        <form action="{{ route('admin.message.update', $message->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="chat_id">Chat ID</label>
                <input type="text" class="form-control" id="chat_id" name="chat_id" value="{{ $message->chat_id }}">
            </div>
            <div class="form-group">
                <label for="user_id">User ID</label>
                <input type="text" class="form-control" id="user_id" name="user_id" value="{{ $message->user_id }}">
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea class="form-control" id="content" name="content">{{ $message->content }}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    </div>
@endsection
