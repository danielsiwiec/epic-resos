const puppeteer = require('puppeteer')
import LoginPage from './pageobjects/login'
import ReservationsPage from './pageobjects/reservations'

const _loadBrowser = async () => {
  console.log('Loading browser...')
  return puppeteer.launch({
    headless: true,
    product: 'chrome',
    args: ['--no-sandbox']
  })
}

let browser

const listReservations = async ({ username, password }) => {
  browser = browser || await _loadBrowser()

  const context = await browser.createIncognitoBrowserContext()
  const page = await context.newPage()

  const loginPage = new LoginPage(page)
  const reservationsPage = new ReservationsPage(page)
  
  await loginPage.navigate()
  await loginPage.submitCredentials({username, password})

  await reservationsPage.navigate()
  const dates = await reservationsPage.listReservations()

  await page.close()

  return dates
}

export default async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const resos = await listReservations({ username, password })
  res.json({ dates: resos })
}