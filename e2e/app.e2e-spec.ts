import { WhoamiPage } from './app.po';

describe('whoami App', function() {
  let page: WhoamiPage;

  beforeEach(() => {
    page = new WhoamiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
