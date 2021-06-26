export interface Options {
  /**
   * Holodex/HoloAPI Server Entrypoint
   * @default "https://holodex.net/api/v2"
   */
  url: string;

  /**
   * Your personal API key. Be aware that the validity of the key is not checked, so ensure it is correct.
   *
   * You can acquire a API KEY via the Account Settings page.
   */
  apiKey: string;
}
