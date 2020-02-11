let postcss = require('postcss')

module.exports = postcss.plugin('postcss-cell', (decl = /^(width|height)$/) => {
  const isCell = /^\d+\/\d+/
  return (root) => {
    root.walkDecls(decl, decl => {
      if (!isCell.test(decl.value)) return

      let matches = decl.value.match(/((\d+)\/(\d+))(\s+((\d+)(px|%|em|rem|pt|wh|wv)))?/)

      let span = matches[2]
      let cols = matches[3]
      let gap = matches[6]
      let gapExt = matches[7]
      let size = span/cols * 100
      let gaps = gap * (cols - 1)

      let value = !gaps ? size + '%'
        : gapExt === '%' ? size - gap * (cols - span) / cols + '%'
        : `calc(${size}% - ${gap * (cols - span) / cols}${gapExt})`

      decl.cloneBefore({ value })
      decl.remove()
    })
    // Transform CSS AST here

  }
})
