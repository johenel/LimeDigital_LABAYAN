<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function list()
    {
        $response = [];
        $response['success'] = true;
        $response['data'] = Category::orderBy('id', 'desc')->get();

        return $response;
    }

    public function create(Request $request)
    {
        $response = [];

        $validator = Validator::make($request->all(), [
            'slug' => 'required|unique:categories|max:255',
        ]);

        if($validator->fails()):
            $response['success'] = false;
            $response['errors'] =  $validator->getMessageBag();
        else:
            $category = new Category();

            $category->slug = $request->slug;
            if($request->has('parent_id')) {
                $category->parent_id = $request->parent_id;
            }
            $category->save();

            $response['success'] = true;
            $response['data'] = $category;
        endif;

        return $response;
    }

    public function update(Request $request, $id)
    {
        $response = [];

        $validator = Validator::make($request->all(), [
            'slug' => 'required|unique:categories|max:255',
        ]);

        $category = Category::find($id);

        if($category->slug == $request->slug):
            $response['success'] = true;
            $response['data'] = $category;
        elseif($validator->fails()):
            $response['success'] = false;
            $response['errors'] = $validator->getMessageBag();
        else:
            $category->slug = $request->slug;
            $category->parent_id = 0;
            $category->save();

            $response['success'] = true;
            $response['data'] = $category;
        endif;

        return $response;
    }

    public function delete($id)
    {
        $category = Category::find($id);
        $deleteItem = $category->id;
        $category->delete();

        $response = [];
        $response['success'] = true;
        $response['data'] = $deleteItem;

        return $response;
    }
}
