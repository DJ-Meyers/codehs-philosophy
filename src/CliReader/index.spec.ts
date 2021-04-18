import { expect } from 'chai';
import Chai from 'chai';
import ChaiAsPromised from 'chai-as-promised';
import CliReader from '.';

const mockArgv = require('mock-argv');

Chai.use(ChaiAsPromised);

describe('CLI Reader', () => {
  describe('Get Url', () => {
    it('Should throw if no URL is passed', () => {
      mockArgv([], () => {
        expect(CliReader.GetUrl()).to.throw();
      });
    });

    it('Should throw if more than one parameter is passed', () => {
      mockArgv(['foo', 'bar'], () => {
        expect(CliReader.GetUrl()).to.throw();
      });
    });

    it('Should return the first passed argument', () => {
      mockArgv(['foo'], () => {
        expect(CliReader.GetUrl()).to.equal('foo');
      });
    });
  });
});
