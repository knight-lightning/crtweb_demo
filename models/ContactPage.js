class ContactPage {
    constructor(page) {
      this.page = page
    }
    async navigate() {
      await this.page.goto('https://crtweb.ru/contacts');
    }
    async login() {

    }
  }

  module.exports = { ContactPage }