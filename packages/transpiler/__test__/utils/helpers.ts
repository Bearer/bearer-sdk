import fs from 'fs'
import { UnitFixtureDirectory, BuildUnitFixtureDirectory } from '../utils/location'
import path from 'path'

export function runUnitOn(name: string) {
  const srcDirectory = UnitFixtureDirectory(name)
  const buildDirectory = BuildUnitFixtureDirectory(name)
  fs.readdirSync(srcDirectory).forEach(file => {
    describe(file.replace(/\.tsx?/, '').replace(/\-/g, ' '), () => {
      it('match snapshot', async done => {
        expect.assertions(1)
        fs.readFile(path.join(buildDirectory, file), 'utf8', (e, postContent) => {
          expect({
            postContent,
            file
          }).toMatchSnapshot()
          done()
        })
      })
    })
  })
}
