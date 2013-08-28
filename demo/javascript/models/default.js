// Generated by CoffeeScript 1.6.2
var Backbone, global, jQuery, sparse, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

global = typeof exports !== "undefined" && exports !== null ? exports : window;

if (typeof exports !== 'undefined') {
  _ = require('underscore')._;
  Backbone = require('backbone');
  jQuery = require('jQuery');
  sparse = require('../sparse').sparse;
}

(function($) {
  'use strict';
  var SparseDemo, _ref;

  if (!global.SparseDemo) {
    SparseDemo = global.SparseDemo = {};
  }
  sparse.Model.prototype.nestCollection = function(attributeName, nestedCollection) {
    var i, item, _i, _len,
      _this = this;

    for (i = _i = 0, _len = nestedCollection.length; _i < _len; i = ++_i) {
      item = nestedCollection[i];
      this.attributes[attributeName][i] = (nestedCollection.at(i)).attributes;
    }
    nestedCollection.bind('add', function(initiative) {
      if (!_this.get(attributeName)) {
        _this.attributes[attributeName] = [];
      }
      return (_this.get(attributeName)).push(initiative.attributes);
    });
    nestedCollection.bind('remove', function(initiative) {
      var updateObj;

      updateObj = {};
      updateObj[attributeName] = _.without(_this.get(attributeName), initiative.attributes);
      return _this.set(updateObj);
    });
    return nestedCollection;
  };
  return SparseDemo.DefaultData = (function(_super) {
    __extends(DefaultData, _super);

    function DefaultData() {
      _ref = DefaultData.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DefaultData.prototype.url = function() {
      return '/data.json';
    };

    DefaultData.prototype.sync = function(method, model, options) {
      return Backbone.Model.prototype.sync.call(this, method, model, options);
    };

    DefaultData.prototype.initialize = function(o) {
      var _this = this;

      return this.bind('change', function() {
        return _.each(_this.attributes, function(v, k) {
          var className;

          return _this[className = "" + (k.charAt(0).toUpperCase()) + (k.substring(1, k.length))] = _this.nestCollection(className, new (sparse.Collection.extend({
            __parse_classname: className,
            model: sparse.Model.extend({
              __parse_classname: className
            })
          }))(v));
        });
      });
    };

    return DefaultData;

  })(sparse.Model);
})(jQuery);