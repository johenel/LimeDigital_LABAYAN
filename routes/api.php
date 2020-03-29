<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function() {

    /*
     *  ADMIN Endpoints
     *
     * */

    // CATEGORY
    Route::get('/categories', 'Api\V1\CategoryController@list');
    Route::post('/categories', 'Api\V1\CategoryController@create');
    Route::patch('/categories/{id}', 'Api\V1\CategoryController@update');
    Route::delete('/categories/{id}', 'Api\V1\CategoryController@delete');

    // MEDIA FILES
    Route::get('/media-files', 'Api\V1\MediaFileController@list');
    Route::post('/media-files', 'Api\V1\MediaFileController@create');
    Route::patch('/media-files/{id}', 'Api\V1\MediaFileController@update');
    Route::delete('/media-files/{id}', 'Api\V1\MediaFileController@delete');
});
