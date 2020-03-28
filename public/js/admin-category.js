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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/pages/admin-category.js":
/*!**********************************************!*\
  !*** ./resources/js/pages/admin-category.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(function () {
  initCategoryListTable();
  addCategorySubmitBtnListener();
  deleteCategoryBtnListener();
  editCategoryBtnListener();
  cancelActionBtnListener();
  updateCategoryBtnListener();
});

function initCategoryListTable() {
  $('table').dataTable({
    ajax: '/api/v1/categories',
    dataSrc: 'data',
    order: [[0, "desc"]],
    columns: [{
      data: 'id'
    }, {
      data: 'slug'
    }, {
      title: 'Actions',
      render: function render(data, type, row) {
        return '<button class="btn btn-warning btn-sm edit-category">Edit</button><button class="btn btn-danger btn-sm delete-category" style="margin-left: 10px">Delete</button>';
      }
    }]
  });
}

function addCategorySubmitBtnListener() {
  $('#addNewCategory input[type=submit]').click(function (e) {
    e.preventDefault();
    $('#addNewCategory').waitMe();
    $.ajax({
      url: '/api/v1/categories',
      method: 'post',
      data: {
        slug: $('#addNewCategory input[name=slug]').val(),
        parent_id: $('#addNewCategory select[name=parent_id]').val()
      },
      success: function success(res) {
        $('#addNewCategory').waitMe('hide');

        if (res.success == true) {
          $('table').DataTable().ajax.reload();
          $('#addNewCategory input[name=slug]').val('');
          $('#addNewCategory select[name=parent_id]').val(0);
        } else {
          var errors = res.errors;
          var html = '<ul>';

          for (var i in errors) {
            html += '<li>' + errors[i] + '</li>';
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

function deleteCategoryBtnListener() {
  $(document).on('click', '.delete-category', function () {
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
          url: '/api/v1/categories/' + id,
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

function editCategoryBtnListener() {
  $(document).on('click', '.edit-category', function () {
    var tr = $(this).closest('tr');
    var curSlug = $('td:nth-child(2)', tr).text();
    $('td:nth-child(2)', tr).empty();
    $('td:nth-child(2)', tr).append('<input type="text" class="form-control" style="height:auto" value="' + curSlug + '">');
    $('td:nth-child(3)', tr).empty();
    $('td:nth-child(3)', tr).append('<button class="btn btn-success btn-sm update-category">Update</button><button class="btn btn-outline-default btn-sm cancel-action-category" style="margin-left: 10px">Cancel</button>');
  });
}

function updateCategoryBtnListener() {
  $(document).on('click', '.update-category', function () {
    var tr = $(this).closest('tr');
    var id = $('td:nth-child(1)', tr).text();
    var newSlug = $('td:nth-child(2) input[type=text]', tr).val();
    $('body').waitMe();
    $.ajax({
      url: '/api/v1/categories/' + id,
      method: 'patch',
      data: {
        slug: newSlug
      },
      success: function success(res) {
        $('body').waitMe('hide');

        if (res.success == true) {
          Swal.fire('Update success!', '', 'success');
          $('table').DataTable().ajax.reload();
        } else {
          var errors = res.errors;
          var html = '<ul>';

          for (var i in errors) {
            html += '<li>' + errors[i] + '</li>';
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

function cancelActionBtnListener() {
  $(document).on('click', '.cancel-action-category', function () {
    $('table').DataTable().ajax.reload();
  });
}

/***/ }),

/***/ 1:
/*!****************************************************!*\
  !*** multi ./resources/js/pages/admin-category.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laragon\www\limedigitalCMS\resources\js\pages\admin-category.js */"./resources/js/pages/admin-category.js");


/***/ })

/******/ });