/* eslint-disable no-console */

import CliReader from './CliReader';
import WikipediaNavigator from './WikipediaNavigator';

const MAX_HOPS: number = 100;
let url: string = '';
try {
  url = CliReader.GetUrl();
} catch (e) {
  console.log(e);
}

const navigator = new WikipediaNavigator(MAX_HOPS);

navigator.findPhilosophyFrom(url)
  .then((res) => {
    const hopString = res === 1 ? 'hop' : 'hops';
    console.log(`${res} ${hopString}`);
  })
  .catch((err) => console.log(err));
