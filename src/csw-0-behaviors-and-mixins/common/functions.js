// Generated by LiveScript 1.5.0
/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
(function(){
  var x$;
  x$ = csw.functions;
  /**
   * Modal dialog
   *
   * @param {(HTMLElement|jQuery|string)} content
      *
   * @return {HTMLElement}
   */
  x$.modal = function(content){
    var modal;
    modal = document.createElement('csw-modal');
    if (typeof content === 'string' || content instanceof Function) {
      modal.innerHTML = content;
    } else {
      if ('jquery' in content) {
        content.appendTo(modal);
      } else {
        modal.appendChild(content);
      }
    }
    document.documentElement.appendChild(modal);
    return modal;
  };
  /**
   * Simple modal dialog that will be opened automatically and destroyed after closing
   *
   * @param {(HTMLElement|jQuery|string)} content
      *
   * @return {HTMLElement}
   */
  x$.simple_modal = function(content){
    var x$;
    x$ = csw.functions.modal(content);
    x$.autoDestroy = true;
    x$.open();
    return x$;
  };
  /**
   * Alert modal
   *
   * @param {(HTMLElement|jQuery|string)} content
      *
   * @return {Promise}
   */
  x$.alert = function(content){
    if (content instanceof Function) {
      content = content.toString();
    }
    if (typeof content === 'string' && content.indexOf('<') === -1) {
      content = "<h3>" + content + "</h3>";
    }
    return new Promise(function(resolve){
      var x$, modal, y$, ok, z$, ok_button, z1$;
      x$ = modal = csw.functions.modal(content);
      x$.autoDestroy = true;
      x$.manualClose = true;
      y$ = ok = document.createElement('csw-button');
      y$.innerHTML = '<button>OK</button>';
      y$.primary = true;
      y$.action = 'close';
      y$.bind = modal;
      z$ = ok_button = ok.firstElementChild;
      z$.addEventListener('click', function(){
        resolve();
        modal.close();
      });
      z1$ = modal;
      z1$.ok = ok_button;
      z1$.appendChild(ok);
      z1$.open();
      ok_button.focus();
    });
  };
  /**
   * Confirm modal
   *
   * @param {(HTMLElement|jQuery|string)} content
   * @param {Function}                    ok_callback
   * @param {Function}                    cancel_callback
      *
   * @return {(HTMLElement|Promise)}
   */
  x$.confirm = function(content, ok_callback, cancel_callback){
    var x$, modal, y$, ok, z$, ok_button, z1$, cancel, z2$, cancel_button, z3$;
    if (content instanceof Function) {
      content = content.toString();
    }
    if (typeof content === 'string' && content.indexOf('<') === -1) {
      content = "<h3>" + content + "</h3>";
    }
    x$ = modal = csw.functions.modal(content);
    x$.autoDestroy = true;
    x$.manualClose = true;
    y$ = ok = document.createElement('csw-button');
    y$.innerHTML = '<button>OK</button>';
    y$.primary = true;
    z$ = ok_button = ok.firstElementChild;
    z$.addEventListener('click', function(){
      if (typeof ok_callback == 'function') {
        ok_callback();
      }
      modal.close();
    });
    z1$ = cancel = document.createElement('csw-button');
    z1$.innerHTML = '<button>Cancel</button>';
    z2$ = cancel_button = cancel.firstElementChild;
    z2$.addEventListener('click', function(){
      if (typeof cancel_callback == 'function') {
        cancel_callback();
      }
      modal.close();
    });
    z3$ = modal;
    z3$.ok = ok_button;
    z3$.cancel = cancel_button;
    z3$.appendChild(ok);
    z3$.appendChild(cancel);
    z3$.open();
    ok_button.focus();
    if (ok_callback) {
      return modal;
    } else {
      return new Promise(function(resolve, reject){
        ok_button.addEventListener('click', function(){
          resolve();
          modal.close();
        });
        cancel_button.addEventListener('click', function(){
          reject();
          modal.close();
        });
      });
    }
  };
  /**
   * Prompt modal
   *
   * `ok_callback` will be called or Promise will be resolved with value that user enter in text field
   *
   * @param {(HTMLElement|jQuery|string)} content
   * @param {Function}                    ok_callback
   * @param {Function}                    cancel_callback
      *
   * @return {(HTMLElement|Promise)}
   */
  x$.prompt = function(content, ok_callback, cancel_callback){
    var modal, x$, input, ok, cancel;
    if (content instanceof Function) {
      content = content.toString();
    }
    if (typeof content === 'string' && content.indexOf('<') === -1) {
      content = "<h3>" + content + "</h3>";
    }
    modal = csw.functions.confirm("" + content + "\n<p><csw-input-text><input type=\"text\"></csw-input-text></p>", function(){});
    x$ = modal.input = modal.querySelector('input');
    x$.focus();
    input = modal.input, ok = modal.ok, cancel = modal.cancel;
    if (ok_callback) {
      ok.addEventListener('click', function(){
        ok_callback(input.value);
      });
      cancel.addEventListener('click', function(){
        if (typeof cancel_callback == 'function') {
          cancel_callback();
        }
      });
      return modal;
    } else {
      return new Promise(function(resolve, reject){
        ok.addEventListener('click', function(){
          resolve(input.value);
        });
        cancel.addEventListener('click', function(){
          reject();
        });
      });
    }
  };
  /**
   * Notify
   *
   * @param {(HTMLElement|jQuery|string)} content
      *
   * @return {HTMLElement}
   */
  x$.notify = function(content){
    var options, res$, i$, to$, notify, len$, option;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    options = res$;
    notify = document.createElement('csw-notify');
    if (typeof content === 'string' || content instanceof Function) {
      notify.innerHTML = content;
    } else {
      if ('jquery' in content) {
        content.appendTo(notify);
      } else {
        notify.appendChild(content);
      }
    }
    notify.noIcon = true;
    for (i$ = 0, len$ = options.length; i$ < len$; ++i$) {
      option = options[i$];
      switch (typeof option) {
      case 'string':
        notify[option] = true;
        break;
      case 'number':
        notify.timeout = option;
      }
    }
    document.documentElement.insertBefore(notify, document.querySelector(notify.is));
    return notify;
  };
}).call(this);
