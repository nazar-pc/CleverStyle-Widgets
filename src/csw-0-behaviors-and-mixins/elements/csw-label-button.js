// Generated by LiveScript 1.5.0
/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
(function(){
  csw.behaviors.cswLabelButton = [
    csw.behaviors.label, csw.behaviors.tooltip, csw.behaviors.injectLightStyles, {
      _styles_dom_module: 'csw-label-button-styles',
      properties: {
        first: {
          reflectToAttribute: true,
          type: Boolean
        },
        last: {
          reflectToAttribute: true,
          type: Boolean
        },
        primary: {
          reflectToAttribute: true,
          type: Boolean
        }
      },
      ready: function(){
        var ref$, ref1$;
        if (((ref$ = this.previousElementSibling) != null ? ref$.is : void 8) !== this.is) {
          this.first = true;
        }
        if (((ref1$ = this.nextElementSibling) != null ? ref1$.is : void 8) !== this.is) {
          this.last = true;
        }
        this.querySelector('label').setAttribute('role', 'button');
        if (this.querySelector('input').disabled) {
          return this.querySelector('label').setAttribute('disabled', '');
        }
      }
    }
  ];
}).call(this);
