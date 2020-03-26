let postcss = require('postcss')

const cellSpanPlugin = postcss.plugin('postcss-cellspan', (opts = {}) => {
  prop = opts.prop || /^(width|height)$/
  const isCell = /^\d+\/\d+/
  const parseRE = /^(\d+)\/(\d+)(%|vh|vw|vmin|vmax)?(\s+(\d+)(px|%|em|rem|vw|vh|vmin|vmax|pt))?/

  return (root) => {
    root.walkDecls(prop, decl => {
      if (!isCell.test(decl.value)) return

      let matches = decl.value.match(parseRE),
          span = matches[1],
          cells = matches[2],
          cellExt = matches[3] || '%',
          gap = matches[5],
          gapExt = matches[6],
          size = span / cells * 100,
          gaps = gap * (cells - span) / cells

      let value = !gap ? size + cellExt
        : cellExt === gapExt? size - gaps + cellExt
        : `calc(${size}${cellExt} - ${gaps}${gapExt})`

      decl.cloneBefore({ value })
      decl.remove()
    })
  }
})

module.exports = cellSpanPlugin
