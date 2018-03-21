// Generated by LiveScript 1.5.0
/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
(function(){
  var html;
  html = document.documentElement;
  csw.behaviors.cswTooltip = [
    csw.behaviors.tooltip, {
      properties: {
        show: {
          reflectToAttribute: true,
          type: Boolean
        },
        showQuick: {
          reflectToAttribute: true,
          type: Boolean
        },
        top: {
          reflectToAttribute: true,
          type: Boolean
        }
      },
      listeners: {
        mouseenter: '_set_show',
        pointerenter: '_set_show',
        mouseleave: '_unset_show',
        pointerleave: '_unset_show'
      },
      attached: function(){
        var parent, this$ = this;
        parent = this.parentNode;
        if (!parent.matches('html')) {
          parent.removeChild(this);
          parent.addEventListener('mouseover', (function(){
            function add_tooltip(){
              parent.removeEventListener('mouseover', add_tooltip);
              this$._tooltip_for_element(parent);
            }
            return add_tooltip;
          }()));
        } else {
          document.addEventListener('keydown', function(e){
            if (e.keyCode === 27 && this$.show) {
              this$.show = false;
            }
          });
        }
      },
      _set_show: function(){
        if (this.reset_show) {
          this.reset_show = false;
          this.show = true;
        }
      },
      _unset_show: function(){
        this.show = false;
      },
      _show: function(element){
        var tooltip_position, x$, y$;
        this.reset_show = true;
        if (!element.tooltip || this.show) {
          return;
        }
        this._update_content(element.tooltip);
        tooltip_position = this._get_tooltip_position(element);
        x$ = this.style;
        x$.top = tooltip_position.top + 'px';
        x$.left = tooltip_position.left + 'px';
        this.top = tooltip_position.arrow_top;
        y$ = this.$.arrow.style;
        y$.left = -tooltip_position.arrow_left_offset + 'px';
        y$.right = tooltip_position.arrow_left_offset + 'px';
        this.show = true;
      },
      _hide: function(){
        if (this.show) {
          this.show = false;
        }
      },
      _get_tooltip_position: function(element){
        var tooltip_size, element_position, tooltip_position, client_width, left_offset;
        this.showQuick = true;
        Polymer.flush();
        tooltip_size = this.getBoundingClientRect();
        element_position = element.getBoundingClientRect();
        tooltip_position = {
          top: scrollY,
          left: scrollX,
          arrow_top: false,
          arrow_left_offset: 0
        };
        client_width = html.clientWidth;
        this.showQuick = false;
        if (element_position.top > tooltip_size.height) {
          tooltip_position.top += element_position.top - tooltip_size.height;
        } else {
          tooltip_position.arrow_top = true;
          tooltip_position.top += element_position.bottom;
        }
        left_offset = element_position.left + element_position.width / 2 - tooltip_size.width / 2;
        if (left_offset >= 0) {
          if (left_offset + tooltip_size.width <= client_width) {
            tooltip_position.left += left_offset;
          } else {
            tooltip_position.left += client_width - tooltip_size.width;
            tooltip_position.arrow_left_offset = client_width - tooltip_size.width / 2 - element_position.left - element_position.width / 2;
          }
        } else {
          tooltip_position.arrow_left_offset = tooltip_size.width / 2 - element_position.left - element_position.width / 2;
        }
        return tooltip_position;
      },
      _update_content: function(content){
        if (this.innerHTML !== content) {
          this.innerHTML = content;
        }
      }
    }
  ];
}).call(this);
