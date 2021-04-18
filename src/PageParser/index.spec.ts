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
      const first = await PageParser.getFirstLink(url);

      expect(first).to.equal('https://en.wikipedia.org/wiki/Educational_institution');
    });

    it('Should ignore parentheses', async () => {
      const url = 'https://en.wikipedia.org/wiki/Sanjak_of_Tirhala';
      const first = await PageParser.getFirstLink(url);

      expect(first).to.equal('https://en.wikipedia.org/wiki/Ottoman_Empire');
    });

    it('Should ignore both parentheses and disambiguations', async () => {
      const url = 'https://en.wikipedia.org/wiki/Epistemology';
      const first = await PageParser.getFirstLink(url);

      expect(first).to.equal('https://en.wikipedia.org/wiki/Outline_of_philosophy');
    });

    it('Should go to the next paragraph if there are no links in the first paragraph', async () => {
      const url = 'https://en.wikipedia.org/wiki/William_Manson_(theologian)';
      const first = await PageParser.getFirstLink(url);

      expect(first).to.equal('https://en.wikipedia.org/wiki/University_of_Glasgow');
    })

    it('Should ignore sup tags (e.g., [citation needed])', async () => {
      const url = 'https://en.wikipedia.org/wiki/Identity_(social_science)';
      const first = await PageParser.getFirstLink(url);

      expect(first).to.equal('https://en.wikipedia.org/wiki/Self-image');
    })
  });
});
