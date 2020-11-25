const moment = require('moment')

const resorts = [
  {name: 'Heavenly', code: '6'},
  {name: 'Kirkwood', code: '9'},
  {name: 'Northstar', code: '8'},
]

export default class Availability {
  constructor(page) {
    this.page = page
    this.url = 'https://www.epicpass.com/plan-your-trip/lift-access/reservations.aspx?reservation=true'
    this.availabilityUrl = resortCode => `https://www.epicpass.com/api/LiftAccessApi/GetCapacityControlReservationInventory?resortCode=${resortCode}&startDate=11%2F1%2F2020&endDate=03%2F31%2F2021&_=${moment().valueOf()}`
    this.checkAvailabilityButton = '#passHolderReservationsSearchButton'
    this.selectResortDropdown = '#PassHolderReservationComponent_Resort_Selection'
  }

  async navigate() {
    await this.page.goto(this.url)
    await this.page.waitForSelector(this.checkAvailabilityButton)
    await this.page.select(this.selectResortDropdown, '6')
    await this.page.click(this.checkAvailabilityButton)
  }

  async _availabilityForResort(code) {
    return await this.page.evaluate(url => fetch(url, {
      mode: 'cors',
      credentials: 'include',
      referrer: 'https://www.epicpass.com/plan-your-trip/lift-access/reservations.aspx?reservation=true',
      referrerPolicy: 'strict-origin-when-cross-origin'
    }).then(res => res.json()), this.availabilityUrl(code))
  }

  async listAvailability() {
    return Promise.all(resorts.map(async ({name, code}) => ({name, data: await this._availabilityForResort(code)})))
  }
}