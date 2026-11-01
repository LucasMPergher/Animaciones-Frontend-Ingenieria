import {
  copyFileSync,
  createReadStream,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const appDirectory = path.dirname(fileURLToPath(import.meta.url))
const examplesDirectory = path.resolve(appDirectory, '../web-animation-engineering/examples')
const vendorFiles = new Map([
  ['gsap.min.js', path.join(appDirectory, 'node_modules/gsap/dist/gsap.min.js')],
  ['ScrollTrigger.min.js', path.join(appDirectory, 'node_modules/gsap/dist/ScrollTrigger.min.js')],
  ['lottie.min.js', path.join(appDirectory, 'node_modules/lottie-web/build/player/lottie.min.js')],
])
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
}

function rewriteCdnScripts(html) {
  return html
    .replaceAll('https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js', '/vendor/gsap.min.js')
    .replaceAll('https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js', '/vendor/ScrollTrigger.min.js')
    .replaceAll('https://cdn.jsdelivr.net/npm/lottie-web@5/build/player/lottie.min.js', '/vendor/lottie.min.js')
}

function rewriteCopiedExamples(directory) {
  for (const name of readdirSync(directory)) {
    const file = path.join(directory, name)
    if (statSync(file).isDirectory()) {
      rewriteCopiedExamples(file)
    } else if (path.extname(file) === '.html') {
      writeFileSync(file, rewriteCdnScripts(readFileSync(file, 'utf8')))
    }
  }
}

function serveExamples() {
  const middleware = (request, response, next) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') return next()

    let requestPath
    try {
      requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    } catch {
      return next()
    }

    const requestedFile = path.resolve(examplesDirectory, `.${requestPath}`)
    if (!requestedFile.startsWith(`${examplesDirectory}${path.sep}`) && requestedFile !== examplesDirectory) {
      response.statusCode = 403
      return response.end('Forbidden')
    }

    try {
      let file = requestedFile
      if (statSync(file).isDirectory()) file = path.join(file, 'index.html')
      if (!statSync(file).isFile()) return next()

      response.statusCode = 200
      response.setHeader('Content-Type', contentTypes[path.extname(file)] || 'application/octet-stream')
      response.setHeader('Cache-Control', 'no-cache')
      if (request.method === 'HEAD') return response.end()
      if (path.extname(file) === '.html') {
        return response.end(rewriteCdnScripts(readFileSync(file, 'utf8')))
      }
      createReadStream(file).on('error', next).pipe(response)
    } catch {
      next()
    }
  }

  let outputDirectory
  const vendorMiddleware = (request, response, next) => {
    const filename = path.basename(new URL(request.url, 'http://localhost').pathname)
    const file = vendorFiles.get(filename)
    if (!file || !existsSync(file)) return next()
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    if (request.method === 'HEAD') return response.end()
    createReadStream(file).on('error', next).pipe(response)
  }

  return {
    name: 'serve-animation-examples',
    configResolved(config) {
      outputDirectory = path.resolve(config.root, config.build.outDir)
    },
    configureServer(server) {
      server.middlewares.use('/vendor', vendorMiddleware)
      server.middlewares.use('/examples', middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/vendor', vendorMiddleware)
      server.middlewares.use('/examples', middleware)
    },
    closeBundle() {
      if (existsSync(examplesDirectory)) {
        const examplesOutputDirectory = path.join(outputDirectory, 'examples')
        cpSync(examplesDirectory, examplesOutputDirectory, { recursive: true })
        for (const filename of ['gsap.min.js', 'ScrollTrigger.min.js', 'lottie.min.js']) {
          const source = vendorFiles.get(filename)
          if (source && existsSync(source)) {
            const vendorOutputDirectory = path.join(outputDirectory, 'vendor')
            mkdirSync(vendorOutputDirectory, { recursive: true })
            copyFileSync(source, path.join(vendorOutputDirectory, filename))
          }
        }
        rewriteCopiedExamples(examplesOutputDirectory)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), serveExamples()],
  resolve: {
    dedupe: ['react', 'react-dom', 'motion', 'gsap', '@gsap/react', 'three'],
  },
  server: {
    fs: {
      allow: [appDirectory, path.resolve(appDirectory, '../web-animation-engineering')],
    },
  },
})
