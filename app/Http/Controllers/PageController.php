<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $slug1 = $request->route('slug1');
        $slug2 = $request->route('slug2');

        if($slug1 && $slug2) {
            $category = $slug1;
            $post = $slug2;
        } else {
            $category = null;
            $post = $slug1;
        }

        $response = [];

        if($cslug = Category::where('slug', $category)->first() && $pslug = Post::where('slug', $post)->first()) {
            $response['category'] = $cslug;
            $response['post'] = $pslug;
        } elseif($pslug = Post::where('slug', $post)->first()) {
            $response['category'] = null;
            $response['post'] = $pslug;
        } else {
            abort(404);
        }

        if($response['post']->is_published == 0) {
            abort(404);
        }

        return view('pages.page', $response);
    }
}
