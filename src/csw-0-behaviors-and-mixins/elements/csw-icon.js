// Generated by LiveScript 1.5.0
/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
(function(){
  csw.behaviors.cswIcon = [
    csw.behaviors.tooltip, {
      observers: ['_icon_changed(icon, flipX, flipY, mono, rotate, spin, spinStep)'],
      properties: {
        icon: {
          reflectToAttribute: true,
          type: String
        },
        flipX: {
          reflectToAttribute: true,
          type: Boolean,
          value: false
        },
        flipY: {
          reflectToAttribute: true,
          type: Boolean,
          value: false
        },
        mono: {
          reflectToAttribute: true,
          type: Boolean,
          value: false
        },
        rotate: {
          reflectToAttribute: true,
          type: Number,
          value: false
        },
        spin: {
          reflectToAttribute: true,
          type: Boolean,
          value: false
        },
        spinStep: {
          reflectToAttribute: true,
          type: Boolean,
          value: false
        },
        multiple: {
          type: Boolean,
          value: false
        },
        stacked1: String,
        stacked2: String,
        regular: String
      },
      _icon_changed: function(icon, flipX, flipY, mono, rotate, spin, spinStep){
        var class_prefix, icons;
        if (!icon) {
          this.hidden = true;
          return;
        } else if (this.hidden) {
          this.hidden = false;
        }
        class_prefix = '';
        if (flipX) {
          class_prefix += 'fa-flip-horizontal ';
        }
        if (flipY) {
          class_prefix += 'fa-flip-vertical ';
        }
        if (mono) {
          class_prefix += 'fa-fw ';
        }
        if (rotate) {
          class_prefix += "fa-rotate-" + rotate + " ";
        }
        if (spin) {
          class_prefix += 'fa-spin ';
        }
        if (spinStep) {
          class_prefix += 'fa-pulse ';
        }
        class_prefix += 'fa ';
        icons = icon.split(' ');
        this.multiple = icons.length > 1;
        if (this.multiple) {
          this.stacked1 = class_prefix + this._full_icon_name(icons[0]) + ' fa-stack-2x';
          this.stacked2 = class_prefix + this._full_icon_name(icons[1]) + ' fa-stack-1x fa-inverse';
        } else {
          this.regular = class_prefix + this._full_icon_name(icons[0]);
        }
      },
      _full_icon_name: function(name){
        var ref$;
        if ((ref$ = name.split('-')[0]) === 'fab' || ref$ === 'fa' || ref$ === 'fas' || ref$ === 'far') {
          return name;
        } else {
          return 'fab-' + name + ' fa-' + name;
        }
      }
    }
  ];
}).call(this);
