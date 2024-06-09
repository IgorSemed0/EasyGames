<!-- resources/views/admin/message/create.blade.php -->
@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Create Message</h1>
        <form action="{{ route('admin.message.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="chat_id">Chat ID</label>
                <input type="text" class="form-control" id="chat_id" name="chat_id">
            </div>
            <div class="form-group">
                <label for="user_id">User ID</label>
                <input type="text" class="form-control" id="user_id" name="user_id">
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea class="form-control" id="content" name="content"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
        </form>
    </div>
@endsection
