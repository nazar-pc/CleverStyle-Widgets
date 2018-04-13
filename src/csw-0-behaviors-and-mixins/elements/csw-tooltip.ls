/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
csw.behaviors.csw-tooltip	= [
	csw.behaviors.tooltip
	properties	:
		selectable	:
			reflectToAttribute	: true
			type				: Boolean
		show		:
			reflectToAttribute	: true
			type				: Boolean
		show-quick	:
			reflectToAttribute	: true
			type				: Boolean
		top			:
			reflectToAttribute	: true
			type				: Boolean
	listeners	:
		mouseenter		: '_self_show'
		pointerenter	: '_self_show'
		mouseleave		: '_self_hide'
		pointerleave	: '_self_hide'
	attached : !->
		parent	= @parentNode
		if !parent.matches('html')
			parent.removeChild(@)
			parent.addEventListener('mouseover', !~function add_tooltip
				parent.removeEventListener('mouseover', add_tooltip)
				@_tooltip_for_element(parent)
			)
		else
			document.addEventListener('keydown', (e) !~>
				if e.keyCode == 27 && @show # Esc
					@show = false
			)
	_self_show : !->
		if @selectable
			@show	= true
	_self_hide : !->
		if @selectable
			@_hide()
	_show : (element) !->
		if !element.tooltip || @show
			return
		@_update_content(element.tooltip)
		tooltip_position	= @_get_tooltip_position(element)
		@style
			..top	= tooltip_position.top + 'px'
			..left	= tooltip_position.left + 'px'
		@top				= tooltip_position.arrow_top
		@$.arrow.style
			..left	= -tooltip_position.arrow_left_offset + 'px'
			..right	= tooltip_position.arrow_left_offset + 'px'
		@show				= true
	_hide : !->
		@show	= false
	_get_tooltip_position : (element) ->
		@show-quick			= true
		# Without Polymer.flush() content might not happen in tooltip yet, property might not be configured and as the result position will be incorrect
		Polymer.flush()
		tooltip_size		= @getBoundingClientRect()
		element_position	= element.getBoundingClientRect()
		tooltip_position	=
			top					: scrollY
			left				: scrollX
			arrow_top			: false
			arrow_left_offset	: 0
		client_width		= document.documentElement.clientWidth
		@show-quick			= false
		# Calculation of vertical position
		if element_position.top > tooltip_size.height
			tooltip_position.top	+= element_position.top - tooltip_size.height
		else
			tooltip_position.arrow_top	= true
			tooltip_position.top		+= element_position.bottom
		# Calculation of horizontal position
		left_offset	= element_position.left + (element_position.width / 2) - (tooltip_size.width / 2)
		if left_offset >= 0
			if left_offset + tooltip_size.width <= client_width
				tooltip_position.left += left_offset
			else
				tooltip_position.left				+= client_width - tooltip_size.width
				tooltip_position.arrow_left_offset	= client_width - (tooltip_size.width / 2) - element_position.left - (element_position.width / 2)
		else
			tooltip_position.arrow_left_offset	= (tooltip_size.width / 2) - element_position.left - (element_position.width / 2)
		tooltip_position
	_update_content : (content) !->
		if @innerHTML != content
			@innerHTML = content
]
