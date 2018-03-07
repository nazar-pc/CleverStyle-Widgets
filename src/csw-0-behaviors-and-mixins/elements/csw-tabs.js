// Generated by LiveScript 1.5.0
/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
(function(){
  csw.behaviors.cswTabs = [{
    hostAttributes: {
      role: 'group'
    },
    properties: {
      selected: {
        notify: true,
        observer: '_selected_changed',
        type: Number
      }
    },
    listeners: {
      tap: '_tap'
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
    _tap: function(e){
      var target, i$, ref$, len$, index, element, this$ = this;
      target = function(){
        var i$, ref$, len$, index, element;
        for (i$ = 0, len$ = (ref$ = e.composedPath()).length; i$ < len$; ++i$) {
          index = i$;
          element = ref$[i$];
          if (element === this$) {
            return e.composedPath()[index - 3];
          }
        }
      }();
      if (!target) {
        return;
      }
      for (i$ = 0, len$ = (ref$ = this.children).length; i$ < len$; ++i$) {
        index = i$;
        element = ref$[i$];
        if (element.matches('template')) {
          continue;
        }
        if (element === target) {
          this.selected = index;
          element.setAttribute('active', '');
        } else {
          element.removeAttribute('active');
        }
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
      if ((ref$ = this.nextElementSibling) != null && (typeof ref$.matches == 'function' && ref$.matches('csw-switcher'))) {
        this.nextElementSibling.selected = selected;
      }
    }
  }];
}).call(this);
