const moment = require('moment')

export default class Availability {
  constructor(page) {
    this.page = page
    this.url = 'https://www.epicpass.com/plan-your-trip/lift-access/reservations.aspx?reservation=true'
    this.availabilityUrl = `https://www.epicpass.com/api/LiftAccessApi/GetCapacityControlReservationInventory?resortCode=6&startDate=11%2F1%2F2020&endDate=11%2F30%2F2020&_=${moment().valueOf()}`
    this.checkAvailabilityButton = '#passHolderReservationsSearchButton'
  }

  async navigate() {
    await this.page.goto(this.url)
    await this.page.waitForSelector(this.checkAvailabilityButton)
  }

  async listAvailability() {
    let response = await this.page.evaluate(() => fetch(this.availabilityUrl, {
      mode: 'cors',
      credentials: 'include',
      referrer: 'https://www.epicpass.com/plan-your-trip/lift-access/reservations.aspx?reservation=true',
      referrerPolicy: 'strict-origin-when-cross-origin'
    }).then(res => res.json()))
    console.log(response)
    return response
  }
}

fetch(`https://www.epicpass.com/api/LiftAccessApi/GetCapacityControlReservationInventory?resortCode=9&startDate=12%2F1%2F2020&endDate=12%2F31%2F2020&_=${moment().valueOf()}`, {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "sec-ch-ua": "\";Not\\\\A\\\"Brand\";v=\"99\", \"Chromium\";v=\"88\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-queueit-ajaxpageurl": "https%3A%2F%2Fwww.epicpass.com%2Fplan-your-trip%2Flift-access%2Freservations.aspx%3Freservation%3Dtrue",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://www.epicpass.com/plan-your-trip/lift-access/reservations.aspx?reservation=true",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(res => res.text()).then(console.log)

fetch(`https://www.epicpass.com/api/LiftAccessApi/GetCapacityControlReservationInventory?resortCode=9&startDate=12%2F1%2F2020&endDate=12%2F31%2F2020&_=${moment().valueOf()}`, {
  "referrer": "https://www.epicpass.com/plan-your-trip/lift-access/reservations.aspx?reservation=true",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(res => res.text()).then(console.log)