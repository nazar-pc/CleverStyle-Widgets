/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
# Export useful functions on `csw.functions`
csw.functions
	/**
	 * Modal dialog
	 *
	 * @param {(HTMLElement|jQuery|string)} content
     *
	 * @return {HTMLElement}
	 */
	..modal = (content) ->
		modal = document.createElement('csw-modal')
		if typeof content == 'string' || content instanceof Function
			modal.innerHTML = content
		else
			if 'jquery' of content
				content.appendTo(modal)
			else
				modal.appendChild(content)
		document.documentElement.appendChild(modal)
		modal
	/**
	 * Simple modal dialog that will be opened automatically and destroyed after closing
	 *
	 * @param {(HTMLElement|jQuery|string)} content
     *
	 * @return {HTMLElement}
	 */
	..simple_modal = (content) ->
		csw.functions.modal(content)
			..autoDestroy	= true
			..open()
	/**
	 * Alert modal
	 *
	 * @param {(HTMLElement|jQuery|string)} content
     *
	 * @return {Promise}
	 */
	..alert = (content) ->
		if content instanceof Function
			content = content.toString()
		if typeof content == 'string' && content.indexOf('<') == -1
			content = "<h3>#content</h3>"
		new Promise (resolve) !->
			modal		= csw.functions.modal(content)
				..autoDestroy	= true
				..manualClose	= true
			ok			= document.createElement('csw-button')
				..innerHTML	= '<button>OK</button>'
				..primary	= true
				..action	= 'close'
				..bind		= modal
			ok_button	= ok.firstElementChild
				..addEventListener('click', !->
					resolve()
				)
			modal
				..ok	= ok_button
				..appendChild(ok)
				..open()
			ok_button.focus()
	/**
	 * Confirm modal
	 *
	 * @param {(HTMLElement|jQuery|string)} content
	 * @param {Function}                    ok_callback
	 * @param {Function}                    cancel_callback
     *
	 * @return {(HTMLElement|Promise)}
	 */
	..confirm = (content, ok_callback, cancel_callback) ->
		if content instanceof Function
			content = content.toString()
		if typeof content == 'string' && content.indexOf('<') == -1
			content = "<h3>#content</h3>"
		modal			= csw.functions.modal(content)
			..autoDestroy	= true
			..manualClose	= true
		ok				= document.createElement('csw-button')
			..innerHTML	= '<button>OK</button>'
			..primary	= true
		ok_button		= ok.firstElementChild
			..addEventListener('click', !->
				ok_callback?()
				modal.close()
			)
		cancel			= document.createElement('csw-button')
			..innerHTML	= '<button>Cancel</button>'
		cancel_button	= cancel.firstElementChild
			..addEventListener('click', !->
				cancel_callback?()
				modal.close()
			)
		modal
			..ok		= ok_button
			..cancel	= cancel_button
			..appendChild(ok)
			..appendChild(cancel)
			..open()
		ok_button.focus()
		if ok_callback
			modal
		else
			new Promise (resolve, reject) !->
				ok_button.addEventListener('click', !->
					resolve()
					modal.close()
				)
				cancel_button.addEventListener('click', !->
					reject()
					modal.close()
				)
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
	..prompt = (content, ok_callback, cancel_callback) ->
		if content instanceof Function
			content = content.toString()
		if typeof content == 'string' && content.indexOf('<') == -1
			content = "<h3>#content</h3>"
		modal				= csw.functions.confirm(
			"""
				#content
				<p><csw-input-text><input type="text"></csw-input-text></p>
			"""
			->
		)
		modal.input			= modal.querySelector('input')
			..focus()
		{input, ok, cancel}	= modal
		if ok_callback
			ok.addEventListener('click', !->
				ok_callback(input.value)
			)
			cancel.addEventListener('click', !->
				cancel_callback?()
			)
			modal
		else
			new Promise (resolve, reject) !->
				ok.addEventListener('click', !->
					resolve(input.value)
				)
				cancel.addEventListener('click', !->
					reject()
				)
	/**
	 * Notify
	 *
	 * @param {(HTMLElement|jQuery|string)} content
     *
	 * @return {HTMLElement}
	 */
	..notify = (content, ...options) ->
		notify = document.createElement('csw-notify')
		if typeof content == 'string' || content instanceof Function
			notify.innerHTML = content
		else
			if 'jquery' of content
				content.appendTo(notify)
			else
				notify.appendChild(content)
		notify.no-icon	= true
		for option in options
			switch typeof option
				when 'string'
					notify[option] = true
				when 'number'
					notify.timeout = option
		document.documentElement.insertBefore(notify, document.querySelector(notify.is))
		notify
