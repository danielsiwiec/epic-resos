const puppeteer = require('puppeteer')
import LoginPage from './pageobjects/login'
import ReservationsPage from './pageobjects/reservations'
import AvailabilityPage from './pageobjects/availability'

const _loadBrowser = async () => {
  console.log('Loading browser...')
  return puppeteer.launch({
    headless: true,
    product: 'chrome',
    args: ['--no-sandbox']
  })
}

let browser

export default async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  browser = browser || await _loadBrowser()

  const context = await browser.createIncognitoBrowserContext()
  const page = await context.newPage()

  const loginPage = new LoginPage(page)
  const reservationsPage = new ReservationsPage(page)
  const availabilityPage = new AvailabilityPage(page)
  
  await loginPage.navigate()
  await loginPage.submitCredentials({username, password})

  await reservationsPage.navigate()
  const resos = await reservationsPage.listReservations()

  await availabilityPage.navigate()
  const availability = await availabilityPage.listAvailability()

  await page.close()
  
  res.json({ resos, availability })
}