const fs = require('fs')

const dirPath = `${__dirname}/../../..`
const frcPath = `${dirPath}/.firebaserc`

export const getProjectName = () => {
  try {
    const jsonString = fs.readFileSync(frcPath)
    const firebaserc = JSON.parse(jsonString)

    return firebaserc.projects.default
  } catch (error) {
    throw error
  }
}