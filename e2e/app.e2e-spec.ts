import { OWTPage } from './app.po';
import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('OWT App', () => {
  let page: OWTPage;

  beforeEach(function (done) {
    page = new OWTPage();
    browser.waitForAngularEnabled(false);
    setTimeout(() => { done(); }, 1);
  });

  it('should select "By city name" as a default page', () => {
    page.navigateTo().then(() => {
      const EC = protractor.ExpectedConditions;
      browser.wait(EC.urlContains('open-weather/by-name'));
      expect(page.getParagraphText()).toEqual('By city name');
      expect(page.getNavbarIconSelectedText()).toEqual('By city name');
    });
  });

});
