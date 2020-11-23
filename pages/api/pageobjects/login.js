export default class LoginPage {
  constructor(page) {
    this.page = page
    this.url = 'https://www.epicpass.com/account/login.aspx?url=%2faccount%2fmy-account.aspx%3fma_1%3d4'
    this.usernameField = '#txtUserName_3'
    this.passwordField = '#txtPassword_3'
    this.acceptCookiesButton = 'button[id=onetrust-accept-btn-handler]'
    this.loginButton = '#divReturningCustomerForm > div:nth-child(4) > button'
  }

  async navigate() {
    await this.page.goto(this.url)
    await this.page.waitForSelector(this.usernameField)
    await this.page.click(this.acceptCookiesButton)
  }

  async submitCredentials({ username, password }) {
    await this.page.type(this.usernameField, username)
    await this.page.type(this.passwordField, password)
    await this.page.waitForTimeout(1000)

    await this.page.click(this.loginButton)
  }
}