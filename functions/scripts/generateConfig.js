const dirPath = `${require('path').dirname(require.main.filename)}/..`
const envPathDev = `${dirPath}/.env.dev`
const envPathProd = `${dirPath}/.env.production`
const firebaseEnvPath = `${dirPath}/src/helper/_AppConfigGenerated.js`

const readValues = () => {
  const parseResult = {}
  const failedLines = []

  if (process.env.MODE === undefined) {
    throw Error('MODE variable is not specified. Can not proceed. Please, check ".env.dev" and "dev.production" files')
  }

  const filePath = process.env.MODE ? envPathDev :  envPathProd

  const lines = require('fs').readFileSync(filePath , 'utf-8')
    .split('\n')

  lines.forEach((line) => {
    let key = null
    let value = null
    try {
      const parts = line.split('=')
      key = parts[0]
      value = parts[1]

      if (key && value) {
        parseResult[key] = value
      }
    } catch (ignore) {
      failedLines.push(line)
    }
  })

  return [parseResult, failedLines]
}

const [parseResult] = readValues()

const generateFileConfig = (object) => {
  let declarationLines = ''
  let exportLines = ''

  Object.keys(object).forEach((key) => {
    declarationLines += `const ${key} = '${object[key]}'\n`
    exportLines += `  ${key},\n`
  })

  const template = `
${declarationLines}

export {
${exportLines}
}
  `

  require('fs').writeFileSync(firebaseEnvPath, template)

  console.log('\nAppConfigGenerated generated successfully\n')
}

generateFileConfig(parseResult)
