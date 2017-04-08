import { PlanszowkarzPage } from './app.po';

describe('planszowkarz App', () => {
  let page: PlanszowkarzPage;

  beforeEach(() => {
    page = new PlanszowkarzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
