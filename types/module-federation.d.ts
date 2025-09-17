declare module '@module-federation/nextjs-mf' {
  import type { Plugin } from 'webpack';
  export class NextFederationPlugin extends Plugin {
    constructor(options: Record<string, unknown>);
  }
}
