export default {
  SaveState: `
  static action(
    _context,
    _params,
    body: any,
    state: any,
    callback: (any) => void
  ): void {
    const { item: { name } } = body
    const { items = [] }: any = state
    const newItem: any = { name }

    callback({
      ...state,
      items: [...items, newItem]
    })
  }
  `,
  RetrieveState: `
  static action(_context: TapiKeyContext, _params: any, state, callback) {
    callback({ items: state.items.map(({ name }) => name) })
  }
  `,
  FetchData: `
  static action(context: TapiKeyContext, params: any, callback: (payload: { data: any }) => void) {
    //... your code goes here
    // use the client defined in client.ts to fetch real object like that:
    // Client(context.authAccess.apiKey).get('/people').then(({ data }) => {
    //   callback({ data })
    // })
    callback({ data: []})
  }
  `
}
