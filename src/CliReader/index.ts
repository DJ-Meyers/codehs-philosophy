export default class CliReader {
  public static GetUrl(): string {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
      throw new Error('Invalid number of arguments');
    }
    return args[0];
  }
}
