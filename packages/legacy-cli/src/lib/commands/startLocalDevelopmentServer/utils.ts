import { getRows } from './storage'

export async function loadUserDefinedData({ query }): Promise<any> {
  const userDataIds = Object.keys(query).filter(key => (key.endsWith("Id") && key !== "setupId") && query[key])

  if (userDataIds.length > 0) {
    return (await Promise.all(userDataIds.map(id => {
      return getRows(query[id])
    }))).reduce((acc, datum, index) => {
      const parsed = JSON.parse(datum)
      const key = userDataIds[index]
      acc[key.replace(/Id$/, "")] = parsed.ReadAllowed ? parsed : null
      return acc
    }, {})
  }
  return {}
}
