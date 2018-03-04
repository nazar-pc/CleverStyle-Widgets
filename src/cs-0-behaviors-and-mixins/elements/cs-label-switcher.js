// Generated by LiveScript 1.5.0
/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
(function(){
  csw.behaviors.csLabelSwitcher = [
    csw.behaviors.label, csw.behaviors.tooltip, csw.behaviors.injectLightStyles, {
      _styles_dom_module: 'cs-label-switcher-styles',
      attached: function(){
        if (this.querySelector('cs-icon')) {
          return;
        }
        this.querySelector('input').insertAdjacentHTML('afterend', '<cs-icon icon="check" mono></cs-icon>');
        if (this.querySelector('input').disabled) {
          this.querySelector('label').setAttribute('disabled', '');
        }
      }
    }
  ];
}).call(this);