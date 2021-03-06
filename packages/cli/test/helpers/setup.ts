import * as fs from 'fs-extra'
import * as path from 'path'
import { artifactPath } from './utils'

type TSetupConfig = {
  clean?: boolean
  authConfig?: any
  folderName?: string
  withViews?: boolean
}

export function ensureFolderExist(folder: string, empty = true) {
  if (!fs.existsSync(folder)) {
    fs.mkdirpSync(folder)
  }
  if (empty) {
    fs.emptyDirSync(folder)
  }
}

export function cleanArtifactFolder(name: string) {
  const bearerFolder = artifactPath(name)
  if (!fs.existsSync(bearerFolder)) {
    fs.mkdirpSync(bearerFolder)
  }

  fs.emptyDirSync(bearerFolder)

  return bearerFolder
}

export function ensureBearerStructure({
  authConfig,
  folderName = 'fakeintegration',
  withViews = false
}: TSetupConfig = {}): string {
  const bearerFolder = cleanArtifactFolder(folderName)

  if (withViews) {
    const views = path.join(bearerFolder, 'views')
    if (!fs.existsSync(views)) {
      fs.mkdirpSync(views)
    }
  }
  fs.writeFileSync(path.join(bearerFolder, '.integrationrc'), 'integrationTile=test')
  fs.writeFileSync(
    path.join(bearerFolder, 'auth.config.json'),
    JSON.stringify(
      authConfig || {
        authType: 'APIKEY'
      }
    )
  )
  return bearerFolder
}
