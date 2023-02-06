export interface IOptionsElement {
  tag: keyof HTMLElementTagNameMap,
  classList?: string[],
  content?: string,
  id?: string,
  key?: string,
}

export interface Validation {
  element: HTMLInputElement,
  regularExpression: RegExp,
  errorMessage: string,
}
