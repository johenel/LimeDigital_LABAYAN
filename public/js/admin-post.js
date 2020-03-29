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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/pages/admin-post.js":
/*!******************************************!*\
  !*** ./resources/js/pages/admin-post.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(function () {
  initTextEditor();
  initCategorySelect();
  addPostBtnListener();
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

function addPostBtnListener() {
  $('.add-post').click(function (e) {
    e.preventDefault();
    var title = $('input[name=title]').val();
    var category = $('select[name=category_id]').val();
    var is_published = $('input[name=is_published]:checked').val();
    var content = tinymce.activeEditor.getContent();
    $('form').waitMe();
    $.ajax({
      url: '/api/v1/posts',
      method: 'post',
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
          $('select[name=category_id][value="0"]').click();
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

/***/ }),

/***/ 3:
/*!************************************************!*\
  !*** multi ./resources/js/pages/admin-post.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laragon\www\limedigitalCMS\resources\js\pages\admin-post.js */"./resources/js/pages/admin-post.js");


/***/ })

/******/ });