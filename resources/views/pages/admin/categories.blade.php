@extends('layouts.admin')
@section('content')
    <div class="container p-4">
        <div class="row">
            <div class="col-md-12">
                <div class="row bg-white">
                    <div class="col-md-4">
                        <h3>Add Category</h3>
                        <hr>
                        <form id="addNewCategory" action="#">
                            @csrf
                            <div class="form-group">
                                <label for="">Slug</label>
                                <input type="text" name="slug" class="form-control required" placeholder="e.g. blogs, news, article">
                            </div>
                            <div class="form-gorup" style="margin-bottom: 25px;">
                                <input type="submit" class="btn btn-success form-control">
                            </div>
                        </form>
                    </div>
                    <div class="col-md-8 p-4">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Slug</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @push('scripts')
        <script src="/js/admin-category.js" type="application/javascript"></script>
        <script>

        </script>
    @endpush
@endsection
