let postcss = require('postcss')

const plugin = postcss.plugin('postcss-cellspan', prop => {
  prop = prop || /^(width|height)$/
  const isCell = /^\d+\/\d+/
  const parseRE = /^(\d+)\/(\d+)(\s+(\d+)(px|%|em|rem|vw|vh|vmin|vmax|pt))?/

  return (root) => {
    root.walkDecls(prop, decl => {
      if (!isCell.test(decl.value)) return

      let matches = decl.value.match(parseRE)
      let span = matches[1]
      let cols = matches[2]
      let gap = matches[4]
      let gapExt = matches[5]
      let size = span / cols * 100
      let gaps = gap * (cols - span) / cols

      let value = !gap ? size + '%'
        : gapExt === '%' ? size - gaps + '%'
        : `calc(${size}% - ${gaps}${gapExt})`

      decl.cloneBefore({ value })
      decl.remove()
    })
  }
})

module.exports = plugin
