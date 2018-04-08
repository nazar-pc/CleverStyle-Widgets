/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
# Chain of promises is used to show/hide notifications sequentially, variable contains always latest promise in chain and is constantly updated
# We'll start doing something only when Web Components are ready
promise						= new Promise(csw.behaviors.ready._when_ready)
csw.behaviors.csw-notify	= [
	csw.behaviors.ready
	properties	:
		bottom		:
			reflectToAttribute	: true
			type				: Boolean
		content		: String
		error		:
			reflectToAttribute	: true
			type				: Boolean
		left		:
			reflectToAttribute	: true
			type				: Boolean
		no-icon		:
			reflectToAttribute	: true
			type				: Boolean
		right		:
			reflectToAttribute	: true
			type				: Boolean
		selectable	:
			reflectToAttribute	: true
			type				: Boolean
		show		:
			reflectToAttribute	: true
			type				: Boolean
		success		:
			reflectToAttribute	: true
			type				: Boolean
		timeout		: Number
		top			:
			reflectToAttribute	: true
			type				: Boolean
		warning		:
			reflectToAttribute	: true
			type				: Boolean
	attached : !->
		@last_node = @parentNode
		if !@parentNode.matches('html')
			document.documentElement.insertBefore(@, document.querySelector(@is))
			return
		if !@bottom && !@top
			@top	= true
		# Hack: Force layout
		@offsetLeft
		@_show()
	_tap : (e) !->
		if !@selectable || e.target == @$.content || e.target == @$.icon
			@_hide()
	_show : !->
		promise := promise.then ~>
			if @content
				@innerHTML = @content
			@show	= true
			@_update_position()
			@fire('show')
			new Promise (resolve) !~>
				setTimeout (!~>
					if @timeout
						setTimeout(@_hide.bind(@), @timeout * 1000)
					resolve()
				), @_transition_duration()
	_hide : !->
		promise := promise.then ~>
			@show	= false
			@_update_position()
			@fire('hide')
			new Promise (resolve) !~>
				setTimeout (!~>
					@parentNode?.removeChild(@)
					resolve()
				), @_transition_duration()
	_get_similar : ->
		_is			= @is
		bottom		= @bottom
		left		= @left
		right		= @right
		top			= @top
		Array.from(document.querySelector('html').children).filter (element) ~>
			element.is == _is &&
			element.bottom == bottom &&
			element.left == left &&
			element.right == right &&
			element.top == top &&
			element.show
	_update_position : (callback) !->
		children	= @_get_similar()
		for current, i in children
			previous	= children[i - 1]
			current._update_own_position(previous)
	_update_own_position : (previous) !->
		if previous
			previous_bottom	= parseFloat(previous.style.marginBottom || 0)
			previous_height	= parseFloat(getComputedStyle(previous).height)
			previous_top	= parseFloat(previous.style.marginTop || 0)
		else
			previous_bottom	= 0
			previous_height	= 0
			previous_top	= 0
		if @top
			@style.marginTop = previous_top + previous_height + 'px'
		else
			@style.marginBottom = previous_bottom + previous_height + 'px'
	_transition_duration : ->
		transition-duration = getComputedStyle(@).transition-duration
		if transition-duration.substr(-2) == 'ms'
			parseFloat(transition-duration)
		else
			parseFloat(transition-duration) * 1000
]
