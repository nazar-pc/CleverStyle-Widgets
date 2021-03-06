/**
 * @package   CleverStyle Widgets
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @license   0BSD
 */
csw.behaviors.ready =
	_when_ready : (action) !->
		if window.WebComponents && window.WebComponents.ready
			setTimeout(action)
		else
			callback	= !->
				setTimeout(action)
				document.removeEventListener('WebComponentsReady', callback)
			document.addEventListener('WebComponentsReady', callback)
