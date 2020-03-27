@extends('layouts.default')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="simple-page-form animated flipInY" id="signup-form">
                <h4 class="form-title m-b-xl text-center">LimeDigital CMS - Sign Up</h4>
                <form action="{{ route('register') }}" method="post">
                    @csrf
                    <div class="form-group">
                        <input id="sign-up-name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" placeholder="Name">
                        @error('name')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <input id="sign-up-email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" placeholder="Email">
                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <input id="sign-up-password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" placeholder="Password">
                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password" placeholder="Confirm Password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="SUBMIT">
                </form>
            </div><!-- #login-form -->
            <div class="simple-page-footer">
                <p>
                    <small>Do you have an account ?</small>
                    <a href="/">LOGIN</a>
                </p>
            </div><!-- .simple-page-footer -->
        </div>
    </div>
</div>
@endsection
