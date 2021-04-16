/**
 * @class Responsible for parsing CLI Input
 */
export default class CliReader {
  /**
   * @returns {string} The URL passed to the CLI
   */
  public static GetUrl = (): string => {
    const args = process.argv.slice(2);

    // Validate CLI Input
    if (args.length !== 1) {
      throw new Error('Invalid number of arguments');
    }

    return args[0];
  };
}
