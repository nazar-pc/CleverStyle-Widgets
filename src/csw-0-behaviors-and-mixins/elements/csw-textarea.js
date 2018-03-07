// Generated by LiveScript 1.5.0
/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
(function(){
  csw.behaviors.cswTextarea = [
    csw.behaviors.ready, csw.behaviors.size, csw.behaviors.tooltip, csw.behaviors.value, {
      properties: {
        autosize: {
          observer: '_autosize_changed',
          reflectToAttribute: true,
          type: Boolean
        },
        initialized: Boolean
      },
      attached: function(){
        this.initialized = true;
        this._when_ready(bind$(this, '_do_autosizing'));
      },
      _autosize_changed: function(){
        this._do_autosizing();
      },
      _do_autosizing: function(){
        if (!this.initialized || this.autosize === undefined) {
          return;
        }
        if (window.autosize) {
          this._do_autosizing_callback(autosize);
        } else if (window.require) {
          require(['autosize'], bind$(this, '_do_autosizing_callback'));
        }
      },
      _do_autosizing_callback: function(autosize){
        if (autosize === undefined) {
          return;
        }
        if (autosize) {
          autosize(this.firstElementChild);
          autosize.update(this.firstElementChild);
        } else {
          autosize.destroy(this.firstElementChild);
        }
      }
    }
  ];
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);
