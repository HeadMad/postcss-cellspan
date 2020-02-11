let postcss = require('postcss')

let plugin = require('./')

async function run (input, output, opts) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('parameter without gap', async () => {
  await run('a{width: 1/4;}', 'a{width: 25%;}')
})

it('parameter width gap in px', async () => {
  await run('a{width: 1/5 30px;}', 'a{width: calc(20% - 24px);}')
})

it('parameter width gap in %', async () => {
  await run('a{width: 1/5 5%;}', 'a{width: 16%;}')
})