'use strict'

const fs = require('fs')
const path = require('path')
const util = require('util')

const readFile = util.promisify(fs.readFile)

async function readManifest(params) {
  const buf = await readFile(path.resolve(params.basePath, 'sanity.json'))

  const manifest = JSON.parse(buf.toString())

  // @todo: extend with `env` parameter

  return manifest
}

module.exports = {readManifest}
