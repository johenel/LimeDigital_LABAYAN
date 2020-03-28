$(function() {
    initCategoryListTable()
    addCategorySubmitBtnListener()
    deleteCategoryBtnListener()
    editCategoryBtnListener()
    cancelActionBtnListener()
    updateCategoryBtnListener()
});

function initCategoryListTable()
{
    $('table').dataTable({
        ajax: '/api/v1/categories',
        dataSrc: 'data',
        order: [[ 0, "desc" ]],
        columns: [
            { data: 'id' },
            { data: 'slug' },
            {
                title: 'Actions',
                render: function (data, type, row) {
                    return '<button class="btn btn-warning btn-sm edit-category">Edit</button><button class="btn btn-danger btn-sm delete-category" style="margin-left: 10px">Delete</button>';
                }
            }
        ]
    })
}

function addCategorySubmitBtnListener()
{
    $('#addNewCategory input[type=submit]').click(function(e) {
        e.preventDefault();
        $('#addNewCategory').waitMe();
        $.ajax({
            url: '/api/v1/categories',
            method: 'post',
            data: {
                slug: $('#addNewCategory input[name=slug]').val(),
                parent_id: $('#addNewCategory select[name=parent_id]').val()
            },
            success: function(res) {
                $('#addNewCategory').waitMe('hide');
                if(res.success == true) {
                    $('table').DataTable().ajax.reload();
                    $('#addNewCategory input[name=slug]').val('');
                    $('#addNewCategory select[name=parent_id]').val(0)
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

function deleteCategoryBtnListener()
{
    $(document).on('click','.delete-category', function () {
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
                        url: '/api/v1/categories/' + id,
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

function editCategoryBtnListener()
{
    $(document).on('click', '.edit-category', function() {
        let tr = $(this).closest('tr');
        let curSlug = $('td:nth-child(2)', tr).text();

        $('td:nth-child(2)', tr).empty()
        $('td:nth-child(2)', tr).append('<input type="text" class="form-control" style="height:auto" value="'+curSlug+'">');
        $('td:nth-child(3)', tr).empty()
        $('td:nth-child(3)', tr).append('<button class="btn btn-success btn-sm update-category">Update</button><button class="btn btn-outline-default btn-sm cancel-action-category" style="margin-left: 10px">Cancel</button>')
    })
}

function updateCategoryBtnListener()
{
    $(document).on('click', '.update-category', function() {
        let tr = $(this).closest('tr');
        let id = $('td:nth-child(1)', tr).text();
        let newSlug = $('td:nth-child(2) input[type=text]', tr).val();

        $('body').waitMe();
        $.ajax({
            url: '/api/v1/categories/' + id,
            method: 'patch',
            data: {
                slug: newSlug
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
    $(document).on('click','.cancel-action-category', function() {
        $('table').DataTable().ajax.reload();
    })
}
