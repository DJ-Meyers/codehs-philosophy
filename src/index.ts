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
  .then((res) => console.log(`${res} hops`))
  .catch((err) => console.log(err));
