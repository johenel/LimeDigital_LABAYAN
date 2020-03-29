@extends('layouts.admin')
@section('content')
    <div class="container p-5">
        <div class="row">
            <div class="col-md-12 bg-white p-4">
                <h1>Pages</h1>
                <hr>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Link</th>
                            <th>Status</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="updatePostModal" role="dialog">
        <div class="modal-dialog modal-lg" style="max-width: 1000px;">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    Edit Post
                </div>
                <div class="modal-body">
                    <div class="container" style="width: 100%;">
                        <div class="row">
                            <div class="col-md-12 bg-white p-4">
                                <form action="#">
                                    <input type="hidden" name="post_id">
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
                                        <textarea name="content" id="" rows="50" class="form-control"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <button class="btn btn-success form-control update-post">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
    @push('scripts')
        <script src="/js/admin-post-all.js" type="application/javascript"></script>
    @endpush
@endsection
