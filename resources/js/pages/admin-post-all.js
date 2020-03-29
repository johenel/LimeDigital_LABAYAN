$(function() {
    initPagesTable()
    initTextEditor()
    initCategorySelect()
    deletePostBtnListener()
    editPostBtnListener()
    updatePostBtnListener()
})

function initCategorySelect()
{
    let categorySelect = $('select[name=category_id]');

    $.ajax({
        url: '/api/v1/categories',
        method: 'get',
        success: function(res) {
            if(res.success == true) {
                let categories = res.data;
                console.log(categories)
                for(i in categories) {
                    categorySelect.append('<option value="'+categories[i].id+'">' + categories[i].slug + '</option>')
                }
            } else {
                Swal.fire('Something went wrong loading the categories', '', 'error');
            }
        }
    })
}

function initTextEditor()
{
    let imageList = [];

    $.ajax({
        url: '/api/v1/media-files',
        method: 'get',
        success: function(res) {
            if(res.success == true) {
                for(i in res.data) {
                    let item = {};
                    item.title = res.data[i].name;
                    item.value = window.location.origin + '/storage/media_files/' + res.data[i].media[0].id + '/' + res.data[i].media[0].file_name;
                    imageList.push(item)
                }
            } else {
                Swal.fire('Something went wrong loading the media files', '', 'error');
            }
        }
    })


    tinymce.init({
        selector: 'textarea',
        height: 500,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | image | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        content_css: '//www.tiny.cloud/css/codepen.min.css',
        image_list: imageList
    });
}

function editPostBtnListener()
{
    $(document).on('click', '.edit-post', function() {
        let tr = $(this).closest('tr');
        let id = $('td:nth-child(1)', tr).text();

        $('#updatePostModal').modal('show')
        $('.modal-dialog.modal-lg').waitMe();
        $.ajax({
            url: '/api/v1/posts/' + id,
            method: 'get',
            success: function(res) {
                $('.modal-dialog.modal-lg').waitMe('hide');
                if(res.success == true) {
                    $('input[name=post_id]').val(res.data.id);
                    $('input[name=title]').val(res.data.title);
                    $('select[name=category_id]').val(res.data.category_id);
                    $('input[name=is_published][value='+res.data.is_published+']').prop('checked', true);
                    tinymce.activeEditor.setContent(res.data.content);

                } else {
                    let errors = res.errors;

                    let html = '<ul>';
                    for(let i in errors) {
                        html += '<li>' + errors[i] + '</li>';
                    }
                    html += '</ul>';

                    Swal.fire({
                        title: 'Something went wrong',
                        icon: 'error',
                        html: html
                    })
                }
            }
        })
    });
}

function updatePostBtnListener()
{
    $(document).on('click', '.update-post', function(e) {
        e.preventDefault();
        let id = $('input[name=post_id]').val()
        let title = $('input[name=title]').val()
        let category = $('select[name=category_id]').val()
        let is_published = $('input[name=is_published]:checked').val()
        let content = tinymce.activeEditor.getContent()

        $('form').waitMe()
        $.ajax({
            url: '/api/v1/posts/' + id,
            method: 'patch',
            data: {
                title: title,
                category_id: category,
                is_published: is_published,
                post_content: content
            },
            success: function (res) {
                $('form').waitMe('hide')
                if(res.success == true) {
                    Swal.fire('Success!', '', 'success')
                    $('input[name=title]').val("");
                    tinymce.activeEditor.setContent("");
                    $('select[name=category_id][value="0"]').prop('checked', true);
                    $('table').DataTable().ajax.reload();
                    $('#updatePostModal').modal('hide')

                } else {
                    let errors = res.errors;

                    let html = '<ul>';
                    for(let i in errors) {
                        html += '<li>' + errors[i] + '</li>';
                    }
                    html += '</ul>';

                    Swal.fire({
                        title: 'Something went wrong',
                        icon: 'error',
                        html: html
                    })
                }
            }
        })
    })
}

function initPagesTable()
{
    $('table').dataTable({
        ajax: '/api/v1/posts',
        dataSrc: 'data',
        order: [[ 0, "desc" ]],
        columns: [
            { data: 'id' },
            { data: "title" },
            {
                data: 'link',
                render: function (data, type, row) {
                    return '<a target="_blank" href="/'+data+'">'+window.location.origin+'/'+data+'</a>';
                }
            },
            {
                data: 'is_published',
                render: function (data, type, row) {
                    if(data == 0) {
                        return '<b style="color:red;">Draft</b>';
                    } else {
                        return '<b style="color:limegreen;">Published</b>';
                    }
                }
            },
            {
                data: 'created_at',
                render: function(data, type, row) {
                    return moment(data).format("YYYY-MM-DD HH:mm:ss")
                }
            },
            {
                title: 'Actions',
                render: function (data, type, row) {
                    return '<button class="form-control form-control-sm btn btn-warning btn-sm edit-post">Edit</button><button class="form-control form-control-sm  btn btn-danger btn-sm delete-post" >Delete</button>';
                }
            }
        ]
    })
}

function deletePostBtnListener()
{
    $(document).on('click','.delete-post', function () {
        let tr = $(this).closest('tr');
        let id = $('td:nth-child(1)', tr).text();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        })
            .then((result) => {
                if(result.value) {
                    $('body').waitMe();
                    $.ajax({
                        url: '/api/v1/posts/' + id,
                        method: 'delete',
                        success: function(res) {
                            $('body').waitMe('hide');
                            if(res.success == true) {
                                Swal.fire('Deleted', '', 'success')
                                $('table').DataTable().ajax.reload();
                            } else {
                                Swal.fire('Something went wrong', '', 'error')
                            }
                        }
                    })
                }
            })
    })
}
