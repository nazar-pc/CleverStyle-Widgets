/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
csw.behaviors.button =
	properties	:
		active		:
			notify				: true
			reflectToAttribute	: true
			type				: Boolean
		empty		:
			reflectToAttribute	: true
			type				: Boolean
		icon-before	:
			type				: String
		icon-after	:
			type				: String
		icon		:
			type				: String
		primary		:
			reflectToAttribute	: true
			type				: Boolean
	ready : !->
		@empty	= !@firstElementChild.childNodes.length
		icon-before	= @icon-before || @icon
		if icon-before
			@firstElementChild.insertAdjacentHTML(
				'afterbegin'
				"""<csw-icon icon="#icon-before" mono></csw-icon> """
			)
		if @icon-after
			@firstElementChild.insertAdjacentHTML(
				'beforeend'
				""" <csw-icon icon="#{@icon-after}" mono></csw-icon>"""
			)
