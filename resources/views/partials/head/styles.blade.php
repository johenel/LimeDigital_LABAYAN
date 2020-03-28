{{--Bootstrap--}}
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
{{--Data Tables--}}
<link rel="stylesheet" href="//cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">
{{--jQuery Load Spinner : waitMe--}}
<link rel="stylesheet" href="/css/waitMe.min.css">
{{--Sweet Alert--}}
<link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-material-ui/material-ui.css" rel="stylesheet">
{{--Theme Styles--}}
@if(\Illuminate\Support\Facades\Auth::user())
    @include('partials.themes.infinity-v2.head.admin-styles')
@else
    @include('partials.themes.infinity-v2.head.styles')
@endif
