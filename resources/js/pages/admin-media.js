$(function () {
    initMediaFileListTable()
    addMediaFileBtnListener()
    deleteMediaFilesBtnListener()
    editMediaFileBtnListener()
    cancelActionBtnListener()
    updateMediaFileBtnListener()
})

function initMediaFileListTable()
{
    $('table').dataTable({
        ajax: '/api/v1/media-files',
        dataSrc: 'data',
        order: [[ 0, "desc" ]],
        columns: [
            { data: 'id' },
            {
                data: "media",
                render: function (data, type, row) {
                    return '<img src="/storage/media_files/'+data[0].id+'/'+data[0].file_name+'" height="150" width="200">';
                }
            },
            { data: 'name' },
            {
                data: 'media',
                render: function (data, type, row) {
                    return '<a target="_blank" href="/storage/media_files/'+data[0].id+'/'+data[0].file_name+'">'+window.location.origin+'/storage/media_files/'+data[0].id+'/'+data[0].file_name+'</a>';
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
                    return '<button class="form-control form-control-sm btn btn-warning btn-sm edit-media-file ">Edit</button><button class="form-control form-control-sm  btn btn-danger btn-sm delete-media-file" >Delete</button>';
                }
            }
        ]
    })
}

function addMediaFileBtnListener()
{
    $('.upload-media-file').click(function (e) {
        e.preventDefault()
        $('#addMediaFileForm').waitMe();
        let name = $('#addMediaFileForm input[name=name]').val()
        let mediaFile = $('#addMediaFileForm input[type=file]')[0].files[0];

        let ff = new FormData();
        ff.append('mediaFile', mediaFile)
        ff.append('name', name)

        $.ajax({
            url: '/api/v1/media-files',
            method: 'post',
            contentType: false,
            processData: false,  // Important!
            data: ff,
            success: function(res) {
                $('#addMediaFileForm').waitMe('hide');
                if(res.success == true) {
                    Swal.fire('Success!', '', 'success')
                    $('table').DataTable().ajax.reload();
                    $('#addMediaFileForm input[type=file]').val("");
                    $('#addMediaFileForm input[type=text]').val("");
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

function deleteMediaFilesBtnListener()
{
    $(document).on('click','.delete-media-file', function () {
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
                        url: '/api/v1/media-files/' + id,
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

function editMediaFileBtnListener()
{
    $(document).on('click', '.edit-media-file', function() {
        let tr = $(this).closest('tr');
        let curName = $('td:nth-child(3)', tr).text();

        $('td:nth-child(3)', tr).empty()
        $('td:nth-child(3)', tr).append('<input type="text" class="form-control" style="height:auto" value="'+curName+'">');
        $('td:nth-child(6)', tr).empty()
        $('td:nth-child(6)', tr).append('<button class="btn btn-success btn-sm update-media-file">Update</button><button class="btn btn-outline-default btn-sm cancel-action-media-file" style="margin-left: 10px">Cancel</button>')
    })
}

function updateMediaFileBtnListener()
{
    $(document).on('click', '.update-media-file', function() {
        let tr = $(this).closest('tr');
        let id = $('td:nth-child(1)', tr).text();
        let newName = $('td:nth-child(3) input[type=text]', tr).val();

        $('body').waitMe();
        $.ajax({
            url: '/api/v1/media-files/' + id,
            method: 'patch',
            data: {
                name: newName
            },
            success: function(res) {
                $('body').waitMe('hide')
                if(res.success == true) {
                    Swal.fire(
                        'Update success!',
                        '',
                        'success'
                    )
                    $('table').DataTable().ajax.reload();
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

function cancelActionBtnListener()
{
    $(document).on('click','.cancel-action-media-file', function() {
        $('table').DataTable().ajax.reload();
    })
}
