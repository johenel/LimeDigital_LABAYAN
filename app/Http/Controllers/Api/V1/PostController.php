<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function list()
    {
        $response = [];

        $posts = Post::orderBy('id', 'desc')->get();

        foreach($posts as $p):
            if($p->category_id != 0) {
                $p->link = $p->category->slug . '/' . $p->slug;
            } else {
                $p->link = $p->slug;
            }
        endforeach;

        $response['success'] = true;
        $response['data'] = $posts;

        return $response;
    }

    public function item($id)
    {
        $response = [];

        $post = Post::find($id);

        if($post) {
            $response['success'] = true;
            $response['data'] = $post;
        } else {
            $response['success'] = false;
            $response['errors'] = [
                'No post found'
            ];
        }

        return $response;
    }

    public function create(Request $request)
    {
        $response = [];

        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:posts',
        ]);

        if($validator->fails()) {
            $response['success'] = false;
            $response['errors'] = $validator->getMessageBag();
        } else {
            $post = new Post();
            $post->title = $request->title;
            $post->slug = Str::slug($request->title, '-');
            $post->content = $request->post_content;
            $post->user_id = 0;

            $request->has('category_id') ? $post->category_id = $request->category_id : $post->category_id = 0;
            $request->has('is_published') ? $post->is_published = $request->is_published : $post->is_published = 0;

            $post->save();

            $response['success'] = true;
            $response['data'] = $post;
        }

        return $response;
    }

    public function update(Request $request, $id)
    {
        $response = [];

        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:posts',
        ]);

        $post  = Post::find($id);

        if($post->title == $request->title):
            $post->content = $request->post_content;
            $request->has('category_id') ? $post->category_id = $request->category_id : $post->category_id = 0;
            $request->has('is_published') ? $post->is_published = $request->is_published : $post->is_published = 0;
            $post->update();
            $response['success'] = true;
            $response['data'] = $post;
        elseif($validator->fails()):
            $response['success'] = false;
            $response['errors'] = $validator->getMessageBag();
        else:
            $post->title = $request->title;
            $post->slug = Str::slug($request->title, '-');
            $post->content = $request->post_content;
            $request->has('category_id') ? $post->category_id = $request->category_id : $post->category_id = 0;
            $request->has('is_published') ? $post->is_published = $request->is_published : $post->is_published = 0;
            $post->update();
            $response['success'] = true;
            $response['data'] = $post;
        endif;

        return $response;
    }

    public function delete($id)
    {
        $post = Post::find($id);
        $deleteItem = $post->id;
        $post->delete();

        $response = [];
        $response['success'] = true;
        $response['data'] = $deleteItem;

        return $response;
    }
}
