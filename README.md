# Fast And Simple Grid Cell

[PostCSS] plugin postcss-cellspan.

[PostCSS]: https://github.com/postcss/postcss

```css
.foo {
    width: 1/5 30px; /* colspan/cols [gap] */
    width: 1/4;
    height: 1/5 5%;   /* rowspan/rows [gap] */
}
```

```css
.foo {
  width: calc(20% - 24px);
  width: 25%;
  height: 16%;
}
```

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
const cellspan = require('postcss-cellspan')

module.exports = {
  plugins: [
+   cellspan({prop: /^(width|height)$/}) // {String|RegExp} - porerty for replace value on computed value
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage
