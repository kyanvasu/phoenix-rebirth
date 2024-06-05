import { Configuration } from "../../types";

export class CoreContext {
  private static _instance: CoreContext | null = null;
  protected config: Configuration = {
    sdk: undefined,
    theme: undefined,
  };

  static instance() {
    if (!this._instance) {
      this._instance = new CoreContext();
    }

    return this._instance;
  }

  set(config: Configuration): void {
    this.config = config;
  }

  get(): Configuration {
    return this.config;
  }
}
