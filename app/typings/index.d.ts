export {};

declare global {
  interface Window {
    jquery: JQueryStatic
    $: JQueryStatic
  }
}
