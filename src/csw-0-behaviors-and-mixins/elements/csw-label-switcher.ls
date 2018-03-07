/**
 * @package CleverStyle Widgets
 * @author  Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license 0BSD
 */
csw.behaviors.csw-label-switcher = [
	csw.behaviors.label
	csw.behaviors.tooltip
	csw.behaviors.inject-light-styles
	_styles_dom_module	: 'csw-label-switcher-styles'
	attached : !->
		if @querySelector('csw-icon')
			return
		@querySelector('input').insertAdjacentHTML(
			'afterend'
			'<csw-icon icon="check" mono></csw-icon>'
		)
		if @querySelector('input').disabled
			@querySelector('label').setAttribute('disabled', '')
]
