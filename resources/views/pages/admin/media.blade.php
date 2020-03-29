@extends('layouts.admin')
@section('content')
    <div class="container p-4 bg-white" style="margin-top:30px;">
        <div class="row">
            <div class="col-md-12">
                <h3>Add Media Files</h3>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form action="#" id="addMediaFileForm">
                    <div class="row">
                        <div class="col-md-4">
                            <input type="text" name="name" placeholder="Name (optional)"  class="form-control">
                        </div>
                        <div class="col-md-4">
                            <input type="file" name="media">
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-success btn-sm form-control upload-media-file">Upload</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row p-3">
            <div class="col-md-12" style="background-color: #fbfbfb;overflow: auto">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    @push('scripts')
        <script src="/js/admin-media.js" type="application/javascript"></script>
    @endpush
@endsection
