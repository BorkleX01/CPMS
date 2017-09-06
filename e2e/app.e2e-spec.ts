import { CPMSPage } from './app.po';

describe('cpms App', function() {
  let page: CPMSPage;

  beforeEach(() => {
    page = new CPMSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
