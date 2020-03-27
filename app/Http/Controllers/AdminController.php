<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function listIndex()
    {
        return view('pages.admin.view-all-page');
    }

    public function addIndex()
    {
        return view('pages.admin.add-new-page');
    }

    public function mediaIndex()
    {
        return view('pages.admin.media');
    }

    public function categoryIndex()
    {
        return view('pages.admin.categories');
    }
}
