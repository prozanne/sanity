'use strict'

const path = require('path')
const {resolveTree} = require('./tree')

function getPlugins(tree) {
  if (!tree || !Array.isArray(tree.plugins)) {
    return []
  }

  return tree.plugins.reduce((acc, plugin) => {
    return acc.concat([plugin], getPlugins(plugin))
  }, [])
}

async function resolveParts(params) {
  const tree = await resolveTree(params)
  const allPlugins = getPlugins(tree)
  const partInfo = {}
  const partImpl = {}

  allPlugins.forEach(plugin => {
    const basePath = plugin.basePath
    const paths = plugin.manifest.paths || {source: 'src', compiled: 'dist'}
    const parts = plugin.manifest.parts || []

    parts.forEach(part => {
      // collect info
      if (part.name) {
        partInfo[part.name] = {name: part.name}

        if (part.description) {
          partInfo[part.name].description = part.description
        }
      }

      // collect implementations
      if (part.implements && part.path) {
        if (!partImpl[part.implements]) partImpl[part.implements] = []
        partImpl[part.implements].push({
          source: path.resolve(basePath, paths.source, part.path),
          compiled: path.resolve(basePath, paths.compiled, part.path)
        })
      }
    })
  })

  return {
    info: partInfo,
    impl: partImpl
  }
}

module.exports = {resolveParts}
