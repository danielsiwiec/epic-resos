export default class ReservationsPage {
  constructor(page) {
    this.page = page
    this.url = 'https://www.epicpass.com/account/my-account.aspx#main_nav__dropdown__4'
    this.reservationsExpandButton = '.season_passes__reservations__title--firstPass'
    this.reservationListElement = '.season_passes__reservations__content__list'
    this.reservationElements = `${this.reservationListElement} > li`
    this.reservationPlaceSelector = '.sctexteditor--bold'
    this.reservationDateSelector = '.sctexteditor'
  }

  async navigate() {
    await this.page.waitForSelector(this.reservationsExpandButton)
  }

  async listReservations() {
    await this._expandReservations()
    const resoElements = await this.page.$$(this.reservationElements)
    return await Promise.all(resoElements.map(this._parseReservations.bind(this)))
  }

  async _expandReservations() {
    await this.page.click(this.reservationsExpandButton)
    await this.page.waitForSelector(this.reservationListElement)
  }

  async _parseReservations(resoElement) {
    let place = await this._getTextFromField(await resoElement.$(this.reservationPlaceSelector))
    let date = await this._getTextFromField(await resoElement.$(this.reservationDateSelector))
    return { date, place }
  }

 async _getTextFromField(element) {
    return (await element.getProperty('textContent')).jsonValue()
  }
}