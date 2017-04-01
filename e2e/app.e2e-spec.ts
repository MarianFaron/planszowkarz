import { EngineeringProjectPage } from './app.po';

describe('engineering-project App', function() {
  let page: EngineeringProjectPage;

  beforeEach(() => {
    page = new EngineeringProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
