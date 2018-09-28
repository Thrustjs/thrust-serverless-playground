const StandardCopyOption = Java.type('java.nio.file.StandardCopyOption')
const File = Java.type('java.io.File')
const Files = Java.type('java.nio.file.Files')

const fs = require('fs')
const utils = require('/utils')
const bootstrap = require('/utils/bootstrap')

const consoleColors = require('console-colors')

const redColor = consoleColors.make(consoleColors.COLORS.RED)
const blueColor = consoleColors.make(consoleColors.COLORS.BLUE)

function deployApi (params, request, response) {
  let tempDir

  try {
    console.log(blueColor('Receiving deployment request...'))

    if (request.headers.token !== utils.buildToken(request.rest)) {
      const message = 'Invalid credentials, check your API Key'

      console.log(redColor(message))
      response.json({ message: message }, 401)
      return
    }

    tempDir = Files.createTempDirectory('api-update').toFile()
    const apiZip = File.createTempFile('api', '.zip', tempDir)
    const tempApiFolder = new File(tempDir, 'api')

    console.log(blueColor('Receiving and unziping file...'))

    Files.copy(request.httpRequest.getInputStream(), apiZip.toPath(), StandardCopyOption.REPLACE_EXISTING)
    fs.unzip(apiZip.getPath(), tempApiFolder)

    var backupDir = new File('api-bkp')
    var distDir = new File('api')

    if (distDir.exists()) {
      fs.copyDirectory(distDir, backupDir)
    }

    fs.copyDirectory(tempApiFolder, distDir)

    try {
      bootstrap()

      response.json({
        message: 'API deployed'
      })
    } catch (e) {
      console.log(e)

      response.json({
        message: e.message
      }, 500)
    }
  } finally {
    fs.deleteQuietly(tempDir)
  }
}

exports = {
  'POST': {
    'api': deployApi
  }
}
