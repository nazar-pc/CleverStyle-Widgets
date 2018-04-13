CleverStyle Widgets includes following elements:
* `csw-button`
* `csw-dropdown`
* `csw-form`
* `csw-group`
* `csw-icon`
* `csw-input-text`
* `csw-label-button`
* `csw-label-switcher`
* `csw-link-button`
* `csw-modal`
* `csw-notify`
* `csw-pagination`
* `csw-progress`
* `csw-switcher`
* `csw-select`
* `csw-tabs`
* `csw-textarea`
* `csw-tooltip`

And following helper functions:
* `csw.functions.modal()`
* `csw.functions.simple_modal()`
* `csw.functions.alert()`
* `csw.functions.confirm()`
* `csw.functions.prompt()`
* `csw.functions.notify()`

#### csw-button
Wrapper element for native `button` element.

Attributes (also available as properties, so use whatever is more convenient):
* active - boolean, allows to force `:active` state
* compact - boolean, forces button to have smaller size than usually by reducing padding
* icon-before - string, icon from `csw-icon` element added before button contents, only used on initialization, further changes are not reflected in UI
* icon-after - string, icon from `csw-icon` element added after button contents, only used on initialization, further changes are not reflected in UI
* icon - alias for `icon-before`, only used on initialization, further changes are not reflected in UI
* primary - boolean, allows to apply different styling to button, usually used for some key actions
* tight - boolean, affects styling by removing space after element and placing directly before next element (useful for button groups and combining with inputs)

Properties:
* action - string, method on `bind` object to call on button click (see examples below)
* bind - object, object that contains `action` method to call on button click (see examples below)
* tooltip - string, if specified then tooltip with specified content will be shown on hover

Examples:
```html
<csw-button><button type="button">Button</button></csw-button>
<csw-button primary><button type="button">Primary button</button></csw-button>
<csw-button>
    <button on-tap="_enable" compact>
        <csw-icon icon="check"></csw-icon>
        [[L.enable]]
    </button>
</csw-button>
<template is="dom-bind">
    <csw-modal this="{{modal}}">One Two Three</csw-modal>
    <csw-button bind="[[modal]]" action="open"><button type="button">Button</button></csw-button>
</template>
```

#### csw-dropdown
Regular dropdown element with some content inside.

Attributes (also available as properties, so use whatever is more convenient):
* align - string, either `left` (by default) or `right`
* opened - boolean, is set automatically when dropdown is opened

Properties:
* target - object, if `csw-button` object passed, click on corresponding button will toggle dropdown (if dropdown is placed right after button - this property will be filled automatically)

Example:
```html
<csw-button icon="cog"><button type="button" small-button>[[L.settings]]</button></csw-button>
<csw-dropdown>
    <csw-group vertical>
        <csw-button><button type="button" on-tap="_general_settings">[[L.general]]</button></csw-link-button>
        <csw-button><button type="button" on-tap="_change_password">[[L.change_password]]</button></csw-button>
    </csw-group>
</csw-dropdown>
```

#### csw-form
Wrapper element for native `form` element.

Primary purpose of element is to provide simple form styling (see example below).

Example (and expected markup):
```html
<csw-form>
    <form>
        <label>Name</label>
        <csw-input-text><input></csw-input-text>
        <label>Description</label>
        <csw-textarea><textarea></textarea></csw-textarea>
    </form>
</csw-form>
```

#### csw-group
Creates either horizontal or vertical group of elements (for instance, buttons), where there is no space between them.

Attributes (also available as properties, so use whatever is more convenient):
* vertical - boolean, make vertical group

Example:
```html
<csw-group>
    <csw-button primary><button type="submit">OK</button></csw-button>
    <csw-button><button type="button">Cancel</button></csw-button>
</csw-group>
```

#### csw-icon
Icon element, uses [FontAwesome](http://fontawesome.io/) icons set.

Attributes (also available as properties, so use whatever is more convenient):
* icon - string, icon (from FontAwesome icons set), if 2 icons separated by coma used - first icon is used as background with inverse color
* flip-x - boolean, mirror icon horizontally
* flip-xy - boolean, mirror icon vertically
* mono - boolean, fixed width icons
* rotate - number, rotate icon, can have value 0, 90, 180 or 270
* spin - boolean, makes icon spinning
* spin-step - boolean, makes spinning step-wise with 8 steps, not smooth

Properties:
* tooltip - string, if specified then tooltip with specified content will be shown on hover

Examples:
```html
<csw-icon icon="home"></csw-icon>
<csw-icon icon="home" flip-x></csw-icon>
<csw-icon icon="circle home"></csw-icon>
<csw-icon icon="circle home"></csw-icon>
<csw-icon icon="spinner" spin></csw-icon>
```

#### csw-input-text
Wrapper element for native `input` element.

Attributes (also available as properties, so use whatever is more convenient):
* compact - boolean, uses automatic width computation, which is more compact that enforced styled width
* full-width - boolean, makes element width 100%
* tight - boolean, affects styling by removing space after element and placing directly before next element (useful for button groups and combining with inputs)

Properties:
* tooltip - string, if specified then tooltip with specified content will be shown on hover

Input element will start firing `value-change` event on any `change` or `input` event, so that it works nicely and more convenient with data bindings

Examples:
```html
<csw-input-text><input></csw-input-text>
<csw-input-text><input type="email" value="{{email}}"></csw-input-text>
<csw-input-text full-size><input></csw-input-text>
<p>
    <csw-input-text tight><input></csw-input-text>
    <csw-button><button>Button right after input</button></csw-button>
</p>
```

#### csw-label-button
Wrapper element for native `label` element.

Element is intended to replace regular UI of `input[type=checkbox]` and/or `input[type=radio]` while using native semantic as much as possible (see example).

Attributes (also available as properties, so use whatever is more convenient):
* active - boolean, represents current state of element and its input
* first - boolean, whether current label is first in group of labels, typically set automatically
* last - boolean, whether current label is last in group of labels, typically set automatically

Properties:
* tooltip - string, if specified then tooltip with specified content will be shown on hover
* value - string, provides unified interface for value getting and setting on any label from group, will be synchronized automatically with `input`s `checked` attribute, useful for data-binding

Example:
```html
<csw-label-button>
    <label>
        <input checked type="radio" value="0">
        Zero
    </label>
</csw-label-button>
<csw-label-button>
    <label>
        <input checked type="radio" value="1">
        One
    </label>
</csw-label-button>
```

#### csw-label-switcher
Wrapper element for native `label` element.

Completely similar to `csw-label-button` (except missing `first` and `last` attributes), but has checkbox-like UI instead of button-like in `csw-label-button`.
Example:
```html
<csw-label-switcher>
    <label>
        <input checked type="radio" value="0">
        Zero
    </label>
</csw-label-switcher>
<csw-label-switcher>
    <label>
        <input checked type="radio" value="1">
        One
    </label>
</csw-label-switcher>
```

#### csw-link-button
Wrapper element for native `a` element.

Button-like UI of link. Completely similar to `csw-button` (except missing `action` and `bind` properties).

Example:
```html
<csw-link-button>
    <a href="/" icon="home">Home</a>
</csw-link-button>
```

#### csw-modal
Modal dialog.

If placed right after `csw-button` element, then button will be automatically used for modal opening.

Attributes (also available as properties, so use whatever is more convenient):
* as-is - boolean, if specified then there will be no background in modal
* auto-destroy - boolean, whether to destroy modal on closing
* auto-open - boolean, whether to open modal automatically on creation
* manual-close - boolean, if specified then `Esc` key and click outside of modal will not work and explicit calling `this.close()` will is needed

Properties:
* this - object, read-only, `this` of element, useful for data-binding

Examples:
```html
<template is="dom-bind">
    <csw-modal this="{{modal}}">One Two Three</csw-modal>
    <csw-button bind="[[modal]]" action="open"><button type="button">Button</button></csw-button>
</template>
<csw-button><button type="button">Button</button></csw-button>
<csw-modal>One Two Three</csw-modal>
<csw-modal auto-open>One Two Three</csw-modal>
```

#### csw-notify
Notification element, on creation will move itself to to `document.documentElement` if not there already.

Attributes (also available as properties, so use whatever is more convenient):
* bottom - boolean, whether element is located at bottom of the page
* error - boolean, apply error appearance
* left - boolean, place notification on the left
* no-icon - boolean, allows to remove close button (shown by default)
* right - boolean, place notification on the right
* selectable - boolean, allow contents selection
* success - boolean, apply success appearance
* timeout - number, if specified then will be closed after specified number of seconds (0 by default, which means never close automatically)
* top - boolean, whether element is located at top of the page (used by default if `bottom` not specified)
* warning - boolean, warning success appearance

Properties:
* content - string, notification content (will set `this.innerHTML`, so DOM elements can be inserted into element explicitly instead)

Examples:
```html
<csw-notify>Hello</csw-notify>
<csw-notify success left>Hello</csw-notify>
<csw-notify error bottom right>Hello</csw-notify>
```

#### csw-pagination
Generates pagination by specified page number and total number of pages, especially convenient to use with data bindings.

Attributes (also available as properties, so use whatever is more convenient):
* page - number, current page (starting from 1)
* pages - number, total number of pages

Example:
```html
<csw-pagination page="{{page}}" pages="[[total_pages]]"></csw-pagination>
```

#### csw-progress
Wrapper element for native `progress` element.

Attributes (also available as properties, so use whatever is more convenient):
* full-width - boolean, makes element width 100%
* infinite - boolean, infinite progress bar
* primary - boolean, allows to apply different styling to progress
* text-progress - whether show text with percents inside progress bar
* tight - boolean, affects styling by removing space after element and placing directly before next element (useful for button groups and combining with inputs)
* value - number, useful for data binding, otherwise attribute on `progress` element might be used

Properties:
* tooltip - string, if specified then tooltip with specified content will be shown on hover

Example:
```html
<csw-progress><progress value="20"></progress></csw-progress>
```

#### csw-switcher
Extends native `section` element.

Switcher element, especially useful in conjunction with `csw-tabs` element (see example). If switcher is placed right after `csw-tabs` - tabs will control switcher automatically.

Properties:
* selected - number, current selected content element index (starting from 0)

Examples:
```html
<csw-tabs>
    <csw-button><button type="button">One</button></csw-button>
    <csw-button><button type="button">Two</button></csw-button>
</csw-tabs>
<csw-switcher>
    <article>One</article>
    <article>Two</article>
</csw-switcher>
<csw-switcher selected="[[selected]]">
    <article>One</article>
    <article>Two</article>
</csw-switcher>
<csw-tabs selected="{{selected}}">
    <csw-button><button type="button">One</button></csw-button>
    <csw-button><button type="button">Two</button></csw-button>
</csw-tabs>
```

#### csw-select
Wrapper element for native `select` element.

Attributes (also available as properties, so use whatever is more convenient):
* compact - boolean, uses automatic width computation, which is more compact that enforced styled width
* full-width - boolean, makes element width 100%
* tight - boolean, affects styling by removing space after element and placing directly before next element (useful for button groups and combining with inputs)

Properties:
* selected - string or array, depending on `multiple` attribute might contain single value or array of values (extremely convenient for two-way data-bindings), it is recommended to use it instead of native `value`
* tooltip - string, if specified then tooltip with specified content will be shown on hover

Select element will start firing `value-change` event on any `change` or `input` event, so that it works nicely and more convenient with data bindings (though, `selected` property is much better at this)

Examples:
```html
<csw-select>
    <select>
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
    </select>
</csw-select>
<csw-select selected="{{user_data.language}}">
    <select size="5">
        <template is="dom-repeat" items="[[languages]]" as="language">
            <option value="[[language.clanguage]]">[[language.description]]</option>
        </template>
    </select>
</csw-select>
```

#### csw-tabs
Tabs functionality, especially useful in conjunction with `csw-switcher` element. If next element after tabs is `csw-switcher` - tabs will control it automatically.

Properties:
* selected - number, current selected tab index (starting from 0)

Example:
```html
<csw-tabs>
    <csw-button><button type="button">One</button></csw-button>
    <csw-button><button type="button">Two</button></csw-button>
</csw-tabs>
```

#### csw-textarea
Wrapper element for native `textarea` element.

Attributes (also available as properties, so use whatever is more convenient):
* autosize - boolean, if specified then height will be adjusted dynamically as contents grow (requires https://github.com/jackmoore/autosize and `window.autosize`)
* compact - boolean, uses automatic width computation, which is more compact that enforced styled width
* full-width - boolean, makes element width 100%

Properties:
* tooltip - string, if specified, tooltip with specified content will be shown on hover

Textarea element will start firing `value-change` event on any `change` or `input` event, so that it works nicely and more convenient with data bindings

Examples:
```html
<csw-textarea><textarea></textarea></csw-textarea>
<csw-textarea autosize full-width><textarea rows="5" value="{{content}}"></textarea></csw-textarea>
```

#### csw-tooltip
Tooltip element. `csw-*` elements from this page which have `tooltip` property support will create `csw-tooltip` element automatically, explicit usage needed only for third-party or native elements.

Tooltip is applied to element by placing `csw-tooltip` element inside (see examples), it will be removed from DOM after initialization.

Attributes (also available as properties, so use whatever is more convenient):
* selectable - boolean, allow contents selection

Examples:
```html
<csw-button tooltip="Tooltip contents"><button>Button</button></csw-button>
<csw-button>
    <button tooltip="Tooltip contents">
        Button
        <csw-tooltip></csw-tooltip>
    </button>
</csw-button>
```

#### csw.functions.modal(content : HTMLElement|jQuery|String) : HTMLElement
Generic interface for creating modal from string or element as its content.
Modal element will be attached to `document.documentElement` and returned.

#### csw.functions.simple_modal(content : HTMLElement|jQuery|String) : HTMLElement
Even simpler interface for creating modal from string or element as its content.
Modal will be opened right after creation and destroyed when closed.
Modal element will be attached to `document.documentElement` and returned.

#### csw.functions.alert(content : HTMLElement|jQuery|String) : Promise
Interface for creating modal from string or element as its content specifically for replacing default `window.alert()` method.
Modal will be opened right after creation and destroyed when closed, also will have "OK" button which is focused automatically.
Modal element will be attached to `document.documentElement` and returned.

#### csw.functions.confirm(content : HTMLElement|jQuery|String, ok_callback : Function [, cancel_callback : Function]) : HTMLElement|Promise
Interface for creating modal from string or element as its content specifically for replacing default `window.confirm()` method.
Modal will be opened right after creation and destroyed when closed, also will have "OK" and "Cancel" buttons, "OK" is focused automatically.
Depending on button clicked `ok_callback` or `cancel_callback` will be called.
Modal element will be attached to `document.documentElement` and returned (if `ok_callback` not specified then `Promise` will be returned instead).

#### csw.functions.prompt(content : HTMLElement|jQuery|String, ok_callback : Function [, cancel_callback : Function]) : HTMLElement|Promise
Interface for creating modal from string or element as its content specifically for replacing default `window.prompt()` method.
Modal will be opened right after creation and destroyed when closed, also will have text input field, "OK" and "Cancel" buttons, text input field is focused automatically.
Depending on button clicked `ok_callback` or `cancel_callback` will be called.
Modal element will be attached to `document.documentElement` and returned (if `ok_callback` not specified then `Promise` will be returned instead).

#### csw.functions.notify(content : HTMLElement|jQuery|String [, delay : Number][, type : String]]) : HTMLElement
Interface for creating notifications from string or element as its content.
`delay` and `type` arguments are both optional and can go in any order.
`delay` is number in seconds after which notification will be closed automatically (assumed 0 by default, namely shown until closed manually).
`type` is used to change notification appearance (by default generic appearance is used), one of:
* `success`
* `warning`
* `error`
Notification element will be attached to `document.documentElement` and returned.
