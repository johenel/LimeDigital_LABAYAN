@extends('layouts.admin')
@section('content')
    <div class="container p-5">
        <div class="row">
            <div class="col-md-12 bg-white p-4">
                <form action="#">
                    <div class="form-group">
                        <input type="text" name="title" class="form-control" placeholder="Title">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-4">
                                <h4 style="margin-bottom: 10px;">Category</h4>
                                <select name="category_id" id="" class="form-control">
                                    <option value="0">None</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <h4 style="margin-bottom: 10px;">Visibility</h4>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-6 text-center p-2">
                                            <input type="radio" name="is_published" value="0" checked> Draft
                                        </div>
                                        <div class="col-md-6 text-center p-2">
                                            <input type="radio" name="is_published" value="1"> Publish
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <textarea name="content" id="" cols="30" rows="30" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success form-control add-post">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    @push('scripts')
        <script src="/js/admin-post.js" type="application/javascript"></script>
    @endpush
@endsection
