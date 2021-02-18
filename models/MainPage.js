class MainPage {
  constructor(page) {
    this.page = page
  }
  async navigate() {
    await this.page.goto('https://crtweb.ru')
  }
  async sendForm() {
    // Заполняем форму на главной
    await this.page.waitForSelector('"Нажимая кнопку, вы соглашаетесь на обработку персональных данных"')
    await scrollOnElement(this.page, '"Нажимая кнопку, вы соглашаетесь на обработку персональных данных"')

    await this.page.fill('input.t-input_has-content', 'test123')
    await this.page.fill('#form145390129 div:nth-child(7) div:nth-child(2) > div  input', 'test123')
    await this.page.fill('#form145390129 div:nth-child(7)  div:nth-child(2)  div input', '3 (123) 213 21 31')
    await this.page.fill('textarea.t-input_has-content', 'test123')
    await this.page.setInputFiles('input[name="file_0"]', 'readme.md')
  }
}

module.exports = { MainPage }