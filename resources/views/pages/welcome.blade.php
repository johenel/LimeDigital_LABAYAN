@extends('layouts.default')
@section('title', 'LimeDigital CMS')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-5 col-md-offset-3">
                <div class="simple-page-form animated flipInY" id="login-form">
                    <h4 class="form-title m-b-xl text-center">LimeDigital CMS</h4>
                    <form action="{{ route('login') }}" method="post">
                        @csrf
                        <div class="form-group">
                            <input id="sign-in-email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" placeholder="Email">
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <input id="sign-in-password" type="password" name="password" class="form-control @error('password') is-invalid @enderror" placeholder="Password">
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <input type="submit" class="btn btn-primary" value="SING IN">
                    </form>
                </div><!-- #login-form -->

                <div class="simple-page-footer">
                    <p>
                        <small>Don't have an account ?</small>
                        <a href="/register">CREATE AN ACCOUNT</a>
                    </p>
                </div><!-- .simple-page-footer -->

            </div>
        </div>
    </div>
@endsection
