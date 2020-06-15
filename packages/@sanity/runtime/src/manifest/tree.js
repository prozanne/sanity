'use strict'

const findConfig = require('find-config')
const path = require('path')
const util = require('util')
const {readManifest} = require('./manifest')

const resolve = util.promisify(require('resolve'))

function resolvePluginMainPath(name, params) {
  if (name.startsWith('.') || name.startsWith('@sanity/')) {
    return resolve(name, {basedir: params.basePath})
  }

  return resolve(`sanity-plugin-${name}`, {basedir: params.basePath})
}

async function resolvePlugin(name, params) {
  const mainPath = await resolvePluginMainPath(name, params)
  const manifestPath = findConfig('sanity.json', {cwd: path.dirname(mainPath)})
  const pluginPath = path.dirname(manifestPath)

  return resolveTree({basePath: pluginPath, name})
}

function resolvePlugins(rootManifest, params) {
  const pluginNames = rootManifest.plugins || []

  return Promise.all(pluginNames.map(pluginName => resolvePlugin(pluginName, params)))
}

async function resolveTree(params) {
  const rootManifest = await readManifest({basePath: params.basePath})

  const plugins = await resolvePlugins(rootManifest, {basePath: params.basePath})

  return {
    basePath: params.basePath,
    name: params.name || null,
    manifest: rootManifest,
    plugins
  }
}

module.exports = {resolvePlugins, resolveTree}
