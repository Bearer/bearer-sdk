import { Component } from '@stencil/core'
import singers from '../navigator/data.json'

const SINGERS = singers
  .concat(singers)
  .concat(singers)
  .concat(singers)
  .map((item, index) => ({ ...item, name: `${index} - ${item.name}` }))
const PER_PAGE = 5

@Component({
  tag: 'app-scrollable'
})
export class AppScrollable {
  renderCollection = collection => (
    <bearer-navigator-collection
      data={collection}
      renderFunc={item => <navigator-collection-item item={item} />}
    />
  )

  fetcher = ({ page }: { page: number }): Promise<{ items: Array<any> }> => {
    return new Promise((resolve, _reject) => {
      const start = (page - 1) * PER_PAGE
      setTimeout(() => {
        resolve({
          items: SINGERS.slice(start, start + PER_PAGE)
        })
      }, 1000)
    })
  }

  render() {
    return (
      <div>
        <h4>Existing collection</h4>
        <bearer-scrollable
          perPage={PER_PAGE}
          fetcher={this.fetcher}
          renderCollection={this.renderCollection}
        />
      </div>
    )
  }
}
