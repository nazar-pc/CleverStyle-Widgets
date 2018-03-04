// Generated by LiveScript 1.5.0
/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
(function(){
  csw.behaviors.csSwitcher = [{
    properties: {
      selected: {
        notify: true,
        observer: '_selected_changed',
        type: Number
      }
    },
    ready: function(){
      var i$, ref$, len$, element;
      for (i$ = 0, len$ = (ref$ = this.children).length; i$ < len$; ++i$) {
        element = ref$[i$];
        if (element.active) {
          return;
        }
      }
      if (!this.selected) {
        this.selected = 0;
      }
    },
    _selected_changed: function(selected){
      var i$, ref$, len$, index, element;
      if (selected === undefined) {
        return;
      }
      for (i$ = 0, len$ = (ref$ = this.children).length; i$ < len$; ++i$) {
        index = i$;
        element = ref$[i$];
        if (element.matches('template')) {
          continue;
        }
        element.active = index === selected;
        if (index === selected) {
          element.setAttribute('active', '');
        } else {
          element.removeAttribute('active');
        }
      }
    }
  }];
}).call(this);
