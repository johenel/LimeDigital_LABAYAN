@extends('layouts.page')
@section('title', $post->title)
@section('content')
    <style>

    </style>
    <div class="container bg-white p-5" style="height: 100vh">
        <div class="row">
            <h1>{{$post->title}}</h1>
        </div>
        <div class="row">
            <p>{{\Carbon\Carbon::parse($post->created_at)->format('Y-m-d H:i:s')}}</p>
        </div>
        <div class="row">
            <div class="col-md-12">
                <hr>
                {!! $post->content !!}
            </div>
        </div>
    </div>
@endsection
