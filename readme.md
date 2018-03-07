# CleverStyle Widgets
CleverStyle Widgets is a set of useful unstyled custom elements (Web Components) that work nicely with Shadow DOM, ready for convenient data bindings and doesn't enforce any appearance by default (namely, almost no styling by default, just support for many [CSS mixins](https://www.polymer-project.org/2.0/docs/devguide/custom-css-properties#use-custom-css-mixins), so you can style them the way you need).

CleverStyle Widgets project was initially created as a part of [CleverStyle Framework](https://github.com/nazar-pc/CleverStyle-Framework)'s UI, but now available as a separate project for everyone to use.

There are automated tests yet, if you can contribute some - definitely do so!

## How to install
```
npm install cleverstyle-widgets
```

## How to use
1. Include Polymer on your page (only Polymer 2.x is supported, legacy `window.Polymer` is used) alongside with WebComponents polyfill with Shady DOM/CSS support (`webcomponents-hi-sd-ce.js` in order to support all major modern browsers)
2. Include either `src/index.html` for using all components or pick relevant collection of separate components from `src` (make sure to include necessary bits from `src/csw-0-behaviors-and-mixins` too)
3. Look at [API](https://github.com/nazar-pc/CleverStyle-Widgets/blob/master/api.md) for available options and usage examples
4. Configure appearance as you like using [CleverStyle](https://github.com/nazar-pc/CleverStyle-Framework/blob/master/themes/CleverStyle/html/widgets%20styling.html) and [DarkEnergy](https://github.com/nazar-pc/CleverStyle-Framework/blob/master/themes/DarkEnergy/html/widgets%20styling.html) themes as an example (you can find all of the mixins that are current supported in source code), see [screenshots](https://github.com/nazar-pc/CleverStyle-Widgets/tree/master/screenshots) for example of how components might look

## Contribution
Feel free to create issues and send pull requests (for big changes create an issue first and link it from the PR), they are highly appreciated!

When reading source code make sure to configure 1 tab to be 4 spaces (GitHub uses 8 by default), otherwise code might be hard to read.

## License
Free Public License 1.0.0 / Zero Clause BSD License

https://opensource.org/licenses/FPL-1.0.0

https://tldrlegal.com/license/bsd-0-clause-license
