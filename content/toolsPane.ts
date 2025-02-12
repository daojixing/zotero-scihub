import type { ZoteroItem, IZotero } from '../typings/zotero'

declare const Zotero: IZotero

export = new class {
  public async updateAll() {
    Zotero.debug('scihub: updating all items')

    const allItems = await Zotero.Items.getAll()
    const items = allItems.filter(item => {
      const libraryId = item.getField('libraryID')
      const isProcessable = item.isRegularItem() && !item.isCollection()
      const isEditable: boolean = libraryId === null || libraryId === '' || Zotero.Libraries.isEditable(libraryId)

      return isProcessable && isEditable
    }) as [ZoteroItem]

    await Zotero.Scihub.updateItems(items)
  }
}
