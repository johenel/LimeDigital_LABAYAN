<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if(\Illuminate\Support\Facades\Auth::user()) {
       return redirect('/ld-admin/list');
    }
    return view('pages.welcome');
});

Auth::routes();

Route::prefix('ld-admin')->group(function () {
    Route::get('/list', 'AdminController@listIndex');
    Route::get('/add', 'AdminController@addIndex');
    Route::get('/media', 'AdminController@mediaIndex');
    Route::get('/categories', 'AdminController@categoryIndex');
});

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/{slug1}', 'PageController@index');
Route::get('/{slug1}/{slug2}', 'PageController@index');



