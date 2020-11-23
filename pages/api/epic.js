const puppeteer = require('puppeteer')

const loginPageWithAccountRedirect = 'https://www.epicpass.com/account/login.aspx?url=%2faccount%2fmy-account.aspx%3fma_1%3d4'
const usernameField = '#txtUserName_3'
const passwordField = '#txtPassword_3'
const acceptCookiesButton = 'button[id=onetrust-accept-btn-handler]'
const loginButton = '#divReturningCustomerForm > div:nth-child(4) > button'

const reservationExpandButton = '.season_passes__reservations__title--firstPass'

const reservationPlaceSelector = '.sctexteditor--bold'
const reservationDateSelector = '.sctexteditor'

const reservationListElement = '.season_passes__reservations__content__list'
const reservationElements = '.season_passes__reservations__content__list > li'

const login = async (browser, username, password) => {
  const page = await browser.newPage()
  await page.goto(loginPageWithAccountRedirect)
  await page.waitForSelector(usernameField)
  await page.click(acceptCookiesButton)

  await page.type(usernameField, username)

  await page.type(passwordField, password)

  await page.waitForTimeout(1000)
  await page.click(loginButton)
  await page.waitForSelector(reservationExpandButton)

  return page
}

const parseResoElement = async resoElement => ({
  date: await getText(await resoElement.$(reservationDateSelector)),
  place: await getText(await resoElement.$(reservationPlaceSelector))
})

const listReservations = async ({username, password}) => {
  const browser = await puppeteer.launch({headless: true})

  const page = await login(browser, username, password)

  await page.click(reservationExpandButton)
  await page.waitForSelector(reservationListElement)
  const resoElements = await page.$$(reservationElements)
  
  const dates = Promise.all(resoElements.map(parseResoElement))

  await browser.close()

  return dates
}

const getText = async (element) => {
  return await (await element.getProperty('textContent')).jsonValue()
}

export default function handler(req, res) {
  const username = req.body.username
  const password = req.body.password
  return listReservations({username, password}).then(dates => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ dates: dates }))
  })   
}