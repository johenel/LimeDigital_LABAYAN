$(function() {
    initTextEditor()
    initCategorySelect()
    addPostBtnListener()
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

function addPostBtnListener()
{
    $('.add-post').click(function(e) {
        e.preventDefault()
        let title = $('input[name=title]').val()
        let category = $('select[name=category_id]').val()
        let is_published = $('input[name=is_published]:checked').val()
        let content = tinymce.activeEditor.getContent()

        $('form').waitMe()
        $.ajax({
            url: '/api/v1/posts',
            method: 'post',
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
                    $('select[name=category_id][value="0"]').click();
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
