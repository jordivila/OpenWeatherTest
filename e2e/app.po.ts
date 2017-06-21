import { By } from '@angular/platform-browser';
import { browser, element, by, ElementArrayFinder, ElementFinder, ElementHelper } from 'protractor';

export class OWTPage {

  constructor() {

  }

  navigateTo(owtPageUrl?: string) {
    if (!owtPageUrl) {
      owtPageUrl = '/';
    }

    return browser.get(owtPageUrl);
  }

  getTitleElement(): ElementFinder {
    return element(by.tagName('app-route-title'));
  }

  getParagraphText() {
    return this.getTitleElement().element(by.tagName('span')).getText();
  }

  getNavbarIconSelectedText() {
    return element(by.tagName('app-navbar')).element(by.css('a.nav-arrow-first')).element(by.css('span.txt')).getText();
  }

  WaitUntilLoadingIndicatorIsHidden() {
    return browser.wait(() => element.all(by.css('div.wait-indicator.hidden')).isPresent());
  }



}
