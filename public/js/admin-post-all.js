/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/pages/admin-post-all.js":
/*!**********************************************!*\
  !*** ./resources/js/pages/admin-post-all.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(function () {
  initPagesTable();
  initTextEditor();
  initCategorySelect();
  deletePostBtnListener();
  editPostBtnListener();
  updatePostBtnListener();
});

function initCategorySelect() {
  var categorySelect = $('select[name=category_id]');
  $.ajax({
    url: '/api/v1/categories',
    method: 'get',
    success: function success(res) {
      if (res.success == true) {
        var categories = res.data;
        console.log(categories);

        for (i in categories) {
          categorySelect.append('<option value="' + categories[i].id + '">' + categories[i].slug + '</option>');
        }
      } else {
        Swal.fire('Something went wrong loading the categories', '', 'error');
      }
    }
  });
}

function initTextEditor() {
  var imageList = [];
  $.ajax({
    url: '/api/v1/media-files',
    method: 'get',
    success: function success(res) {
      if (res.success == true) {
        for (i in res.data) {
          var item = {};
          item.title = res.data[i].name;
          item.value = window.location.origin + '/storage/media_files/' + res.data[i].media[0].id + '/' + res.data[i].media[0].file_name;
          imageList.push(item);
        }
      } else {
        Swal.fire('Something went wrong loading the media files', '', 'error');
      }
    }
  });
  tinymce.init({
    selector: 'textarea',
    height: 500,
    menubar: false,
    plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
    toolbar: 'undo redo | formatselect | image | ' + 'bold italic backcolor | alignleft aligncenter ' + 'alignright alignjustify | bullist numlist outdent indent | ' + 'removeformat | help',
    content_css: '//www.tiny.cloud/css/codepen.min.css',
    image_list: imageList
  });
}

function editPostBtnListener() {
  $(document).on('click', '.edit-post', function () {
    var tr = $(this).closest('tr');
    var id = $('td:nth-child(1)', tr).text();
    $('#updatePostModal').modal('show');
    $('.modal-dialog.modal-lg').waitMe();
    $.ajax({
      url: '/api/v1/posts/' + id,
      method: 'get',
      success: function success(res) {
        $('.modal-dialog.modal-lg').waitMe('hide');

        if (res.success == true) {
          $('input[name=post_id]').val(res.data.id);
          $('input[name=title]').val(res.data.title);
          $('select[name=category_id]').val(res.data.category_id);
          $('input[name=is_published][value=' + res.data.is_published + ']').prop('checked', true);
          tinymce.activeEditor.setContent(res.data.content);
        } else {
          var errors = res.errors;
          var html = '<ul>';

          for (var _i in errors) {
            html += '<li>' + errors[_i] + '</li>';
          }

          html += '</ul>';
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            html: html
          });
        }
      }
    });
  });
}

function updatePostBtnListener() {
  $(document).on('click', '.update-post', function (e) {
    e.preventDefault();
    var id = $('input[name=post_id]').val();
    var title = $('input[name=title]').val();
    var category = $('select[name=category_id]').val();
    var is_published = $('input[name=is_published]:checked').val();
    var content = tinymce.activeEditor.getContent();
    $('form').waitMe();
    $.ajax({
      url: '/api/v1/posts/' + id,
      method: 'patch',
      data: {
        title: title,
        category_id: category,
        is_published: is_published,
        post_content: content
      },
      success: function success(res) {
        $('form').waitMe('hide');

        if (res.success == true) {
          Swal.fire('Success!', '', 'success');
          $('input[name=title]').val("");
          tinymce.activeEditor.setContent("");
          $('select[name=category_id][value="0"]').prop('checked', true);
          $('table').DataTable().ajax.reload();
          $('#updatePostModal').modal('hide');
        } else {
          var errors = res.errors;
          var html = '<ul>';

          for (var _i2 in errors) {
            html += '<li>' + errors[_i2] + '</li>';
          }

          html += '</ul>';
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            html: html
          });
        }
      }
    });
  });
}

function initPagesTable() {
  $('table').dataTable({
    ajax: '/api/v1/posts',
    dataSrc: 'data',
    order: [[0, "desc"]],
    columns: [{
      data: 'id'
    }, {
      data: "title"
    }, {
      data: 'link',
      render: function render(data, type, row) {
        return '<a target="_blank" href="/' + data + '">' + window.location.origin + '/' + data + '</a>';
      }
    }, {
      data: 'is_published',
      render: function render(data, type, row) {
        if (data == 0) {
          return '<b style="color:red;">Draft</b>';
        } else {
          return '<b style="color:limegreen;">Published</b>';
        }
      }
    }, {
      data: 'created_at',
      render: function render(data, type, row) {
        return moment(data).format("YYYY-MM-DD HH:mm:ss");
      }
    }, {
      title: 'Actions',
      render: function render(data, type, row) {
        return '<button class="form-control form-control-sm btn btn-warning btn-sm edit-post">Edit</button><button class="form-control form-control-sm  btn btn-danger btn-sm delete-post" >Delete</button>';
      }
    }]
  });
}

function deletePostBtnListener() {
  $(document).on('click', '.delete-post', function () {
    var tr = $(this).closest('tr');
    var id = $('td:nth-child(1)', tr).text();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        $('body').waitMe();
        $.ajax({
          url: '/api/v1/posts/' + id,
          method: 'delete',
          success: function success(res) {
            $('body').waitMe('hide');

            if (res.success == true) {
              Swal.fire('Deleted', '', 'success');
              $('table').DataTable().ajax.reload();
            } else {
              Swal.fire('Something went wrong', '', 'error');
            }
          }
        });
      }
    });
  });
}

/***/ }),

/***/ 4:
/*!****************************************************!*\
  !*** multi ./resources/js/pages/admin-post-all.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laragon\www\limedigitalCMS\resources\js\pages\admin-post-all.js */"./resources/js/pages/admin-post-all.js");


/***/ })

/******/ });