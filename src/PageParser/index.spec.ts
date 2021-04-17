import { expect } from 'chai';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import PageParser from '.';
Chai.use(ChaiAsPromised);

describe('Page Parser', () => {
  describe('Get First Link', async () => {
    it('Should get the first link on the page', async () => {
      const url = 'https://en.wikipedia.org/wiki/Menstrie_Castle';
      const first = await PageParser.getFirstLink(url);

      expect(first).to.equal('https://en.wikipedia.org/wiki/Menstrie');
    });

    it('Should ignore disambiguations', async () => {
      const url = 'https://en.wikipedia.org/wiki/School';
      const first = PageParser.getFirstLink(url);

      expect(first).to.equal('https://en.wikipedia.org/wiki/Educational_institution');
    });

    it('Should ignore parentheses', async () => {
      const url = 'https://en.wikipedia.org/wiki/Josef_Skupa';
      const first = PageParser.getFirstLink(url);

      expect(first).to.equal('https://en.wikipedia.org/wiki/Czechs');
    });

    it('Should ignore both parentheses and disambiguations', async () => {
      const url = 'https://en.wikipedia.org/wiki/Epistemology';
      const first = PageParser.getFirstLink(url);

      expect(first).to.equal('https://en.wikipedia.org/wiki/Outline_of_philosophy');
    });
  });
});
