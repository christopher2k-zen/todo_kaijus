
// Injected by webpack; used by css-module as there are no good ways to type them for now
declare const require: {
 (path: string): any;
 (paths: string[], callback: (...modules: any[]) => void): void;
 ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}