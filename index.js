let postcss = require('postcss')

module.exports = postcss.plugin('postcss-cell', (decl = /^(width|height)$/) => {
  const isCell = /^\d+\/\d+/
  return (root) => {
    root.walkDecls(decl, decl => {
      if (!isCell.test(decl.value)) return

      let matches = decl.value.match(/((\d+)\/(\d+))(\s+((\d+)(px|%|em|rem|pt|wh|wv)))?/)

      let width = matches[2]
      let cols = matches[3]
      let gap = matches[6]
      let gaps = gap * (cols - 1)
      let gapExt = matches[7]

      let value = !gaps ? `${(width / cols) * 100}%`
        : gapExt === '%' ? (100 * width - gap * (cols - width)) / cols + '%'
        : `calc(${100 * width / cols}% - ${gap * (cols - width) / cols}${gapExt})`

      decl.cloneBefore({ value })
      decl.remove()
    })
    // Transform CSS AST here

  }
})
