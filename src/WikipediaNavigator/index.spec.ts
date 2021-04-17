import { expect } from "chai";
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import WikipediaNavigator from ".";
Chai.use(ChaiAsPromised);

describe('Wikipedia Navigator', () => {
  describe('URL Validity', async () => {
    it('Should throw error on empty URL', async () => {
      const url = '';
      const nav = new WikipediaNavigator(100, false);

      expect(nav.findPhilosophyFrom(url)).to.be.rejected;
    });

    it('Should throw error on non-Wikipedia URL', () => {
      const url = 'https://github.com/DJ-Meyers/codehs-philosophy';
      const nav = new WikipediaNavigator(100, false);

      expect(nav.findPhilosophyFrom(url)).to.be.rejected;
    });

    it('Should throw error on non-HTTPS URL', () => {
      const url = 'http://en.wikipedia.org/wiki/Philosophy';
      const nav = new WikipediaNavigator(100, false);

      expect(nav.findPhilosophyFrom(url)).to.be.rejected;
    });
  });

  describe('Hop exit condition', () => {
    it('Should throw error on 0 Hop condition', () => {
      const url = 'https://en.wikipedia.org/wiki/Epistemology';
      const nav = new WikipediaNavigator(0, false);

      expect(nav.findPhilosophyFrom(url)).to.be.rejected;
    });
  })
});
