<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>@yield('title')</title>
    @include('partials.head.styles')
</head>
<body class="menubar-left menubar-unfold  theme-primary menubar-light pace-done" style="overflow: auto">
<div class="pace  pace-inactive">
    <div class="pace-progress" data-progress-text="100%" data-progress="99" style="transform: translate3d(100%, 0px, 0px);">
        <div class="pace-progress-inner"></div>
    </div>
    <div class="pace-activity"></div>
</div>
<nav id="app-navbar" class="navbar navbar-inverse navbar-fixed-top primary in" style="padding: 0px;display: block">
    <div class="navbar-header">
        <button type="button" id="menubar-toggle-btn" class="navbar-toggle visible-xs-inline-block navbar-toggle-left hamburger hamburger--collapse js-hamburger">
            <span class="sr-only">Toggle navigation</span>
            <span class="hamburger-box"><span class="hamburger-inner"></span></span>
        </button>

        <button type="button" class="navbar-toggle navbar-toggle-right collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="zmdi zmdi-hc-lg zmdi-more"></span>
        </button>

        <button type="button" class="navbar-toggle navbar-toggle-right collapsed" data-toggle="collapse" data-target="#navbar-search" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="zmdi zmdi-hc-lg zmdi-search"></span>
        </button>
        <a href="../ld-admin/list" class="navbar-brand">
            <span class="brand-name">LimeDigital CMS</span>
        </a>
    </div>
</nav>
<aside id="menubar" class="menubar light in">
    <div class="menubar-scroll" style="height: 98px;">
        <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: auto;">
            <div class="menubar-scroll-inner" style="overflow: hidden; width: auto; height: auto;">
                <ul class="app-menu">
                    <li class="active">
                        <a href="/ld-admin/list">
                            <i class="menu-icon zmdi zmdi-view-list-alt zmdi-hc-lg"></i>
                            <span class="menu-text">View All</span>
                        </a>
                    </li>
                    <li class="">
                        <a href="/ld-admin/add">
                            <i class="menu-icon zmdi zmdi-collection-add zmdi-hc-lg"></i>
                            <span class="menu-text">Add New</span>
                        </a>
                    </li>
                    <li class="">
                        <a href="/ld-admin/media">
                            <i class="menu-icon zmdi zmdi-camera zmdi-hc-lg"></i>
                            <span class="menu-text">Media</span>
                        </a>
                    </li>
                    <li class="">
                        <a href="/ld-admin/categories">
                            <i class="menu-icon zmdi zmdi-group zmdi-hc-lg"></i>
                            <span class="menu-text">Categories</span>
                        </a>
                    </li>
                    <hr>
                    <li class="" style="padding-left: 20px">
                        <form id="logoutBtnForm" action="/logout" method="post">
                            @csrf
                            <buttton class="btn btn-default" type="submit" onclick="logout(event)">
                                <i class="fa fa-power-off" aria-hidden="true"></i>
                                <span class="menu-text" style="margin-left: 10px">Logout</span>
                            </buttton>
                        </form>
                    </li>
                </ul><!-- .app-menu -->
            </div>
        <div class="slimScrollBar" style="background: rgb(152, 166, 173); width: 5px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 30px;"></div><div class="slimScrollRail" style="width: 5px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div><!-- .menubar-scroll-inner -->
    </div><!-- .menubar-scroll -->
</aside>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            @yield('content')
        </div>
    </div>
</div>
@include('partials.body.scripts')
@stack('scripts')
<script type="application/javascript">
    $(function() {
        let lsMenuIndex = localStorage.getItem('lsmi');
        if(lsMenuIndex) {
            $('.app-menu li').removeClass('active');
            $('.app-menu li').eq(lsMenuIndex).addClass('active');
        }
    });

    $('.app-menu li a').click(function(e) {
         let menuIndex = $('.app-menu li a').index(this);
         let lsMenuIndex = localStorage.getItem('lsmi');
         if(lsMenuIndex) {
            $('.app-menu li').removeClass('active');
            $('.app-menu li').eq(lsMenuIndex).addClass('active');
            localStorage.setItem('lsmi', menuIndex);
         } else {
             localStorage.setItem('lsmi', menuIndex);
         }
    });

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem('lsmi');
        $('#logoutBtnForm').submit();
    }

</script>
</body>
</html>
