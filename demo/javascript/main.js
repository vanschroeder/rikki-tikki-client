// Generated by CoffeeScript 1.6.2
var SparseDemo, global,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

global = typeof exports !== "undefined" && exports !== null ? exports : window;

if (!global.SparseDemo) {
  SparseDemo = global.SparseDemo = {};
}

(function($) {
  'use strict';
  var _this = this;

  return $(document).ready(function() {
    var CredentialsModal, _ref;

    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };
    rivets.configure({
      adapter: {
        subscribe: function(obj, keypath, callback) {
          return obj.on('change:' + keypath, callback);
        },
        unsubscribe: function(obj, keypath, callback) {
          return obj.off('change:' + keypath, callback);
        },
        read: function(obj, keypath) {
          return obj.get(keypath);
        },
        publish: function(obj, keypath, value) {
          return obj.set(keypath, value);
        }
      }
    });
    return new (SparseDemo.BaseView.extend({
      el: "body",
      subviews: {
        '#credentialsModal': CredentialsModal = (function(_super) {
          __extends(CredentialsModal, _super);

          function CredentialsModal() {
            _ref = CredentialsModal.__super__.constructor.apply(this, arguments);
            return _ref;
          }

          CredentialsModal.prototype.initialize = function() {
            return rivets.bind(this.el, {
              access: this.model
            });
          };

          CredentialsModal.prototype.model = new (Backbone.Model.extend({
            defaults: {
              app_id: "",
              rest_key: ""
            }
          }));

          CredentialsModal.prototype.events = {
            'click #close': 'hide',
            'click #save': 'setCredentials'
          };

          CredentialsModal.prototype.hide = function(evt) {
            evt.preventDefault();
            this.$el.modal('hide');
            return false;
          };

          CredentialsModal.prototype.show = function() {
            this.$el.css('top', $(window).scrollTop());
            return this.$el.modal('show');
          };

          CredentialsModal.prototype.toggle = function() {
            return this.$el.modal('toggle');
          };

          CredentialsModal.prototype.setCredentials = function(evt) {
            return evt.preventDefault();
          };

          CredentialsModal.prototype.init = function(o) {};

          return CredentialsModal;

        })(Backbone.View)
      },
      getAPIHeaders: function() {
        var _this = this;

        return $.ajax({
          type: 'HEAD',
          async: true,
          url: window.location,
          success: function(mssg, txt, res) {
            var app_id, rest_key;

            if (((app_id = res.getResponseHeader('X-PARSE-APP-ID')) === null) || ((rest_key = res.getResponseHeader('X-PARSE-REST-KEY')) === null)) {
              return _this['#credentialsModal'].show();
            } else {
              return _this.setCredentials(app_id, rest_key);
            }
          }
        });
      },
      childrenComplete: function() {
        return this.delegateEvents();
      },
      getCredentials: function() {
        var appId, restKey;

        if (typeof (appId = sparse.APP_ID || $.cookie('PARSE_APP_ID')) === 'undefined' || typeof (restKey = sparse.REST_KEY || $.cookie('PARSE_REST_KEY')) === 'undefined') {
          return null;
        }
        return {
          app_id: appId,
          rest_key: restKey
        };
      },
      setCredentials: function(appId, restKey) {
        $.cookie('PARSE_APP_ID', sparse.APP_ID = appId);
        return $.cookie('PARSE_REST_KEY', sparse.REST_KEY = restKey);
      },
      unsetCredentials: function() {
        $.cookie('PARSE_APP_ID', sparse.APP_ID = null);
        return $.cookie('PARSE_REST_KEY', sparse.REST_KEY = null);
      },
      createView: function(type) {
        type = ($('div[data-viewid]').attr('data-viewid')) || "index";
        return this.view = new (this.model.get(type))({
          el: $("div[data-viewid=" + type + "]")
        });
      },
      init: function(o) {
        var c;

        global.app = this;
        if ((c = this.getCredentials()) === null) {
          this.getAPIHeaders();
        } else {
          console.log(c);
          this.setCredentials(c.app_id, c.rest_key);
        }
        console.log(sparse.apiOPTS());
        if ((o != null) && o.model) {
          this.model = o.model;
        }
        return this.createView();
      }
    }))({
      model: new Backbone.Model({
        index: SparseDemo.IndexView
      })
    });
  });
})(jQuery);
