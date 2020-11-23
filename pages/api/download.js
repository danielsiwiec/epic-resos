const download = require('download-chromium')
const os = require('os')
const tmp = os.tmpdir()

export default (req, res) => {
  console.log('Downloading chrome...')
  return download({
    revision: 818858,
    installPath: `${tmp}/.local-chromium`
  }).then(() => {
    console.log('Downloaded')
    res.end()
  })
}
