
// Injected by webpack; used by css-module as there are no good ways to type them for now
declare const require: {
 (path: string): any;
 (paths: string[], callback: (...modules: any[]) => void): void;
 ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

interface I18n {
  (key: string, ...params: Array<string|number>): string
  messages: Record<string, string>
}

// Injected in window by the script targetting jsMessages
declare const i18n: I18n


// Basic typings for all the .less files.
// Ideally we would use something like typed-css-module but it's way too broken.
declare module '*.less' {
  interface ClassNames {
    [className: string]: string
  }
  const classNames: ClassNames
  export = classNames
}

declare module '*.sass' {
  interface ClassNames {
    [className: string]: string
  }
  const classNames: ClassNames
  export = classNames
}