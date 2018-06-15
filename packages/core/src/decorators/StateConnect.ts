export function connect(
  mapStateToProps?: Function,
  mapDispatchToProps?: Function
) {
  return (store, component) => {
    if (mapStateToProps) {
      store.mapStateToProps(component, mapStateToProps.bind(component))
    }
    if (mapDispatchToProps) {
      store.mapDispatchToProps(component, mapDispatchToProps.bind(component)())
    }
  }
}
