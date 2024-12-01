interface Foo {
  bar: number
}

export const foo: Foo = { bar: 1 }

export function stringChecks(): void {
  console.log('This should be fine')
  console.log("This should be 'fine'")
  console.log(`This should be fine ${1 + 1}`)

  console.log(`This should be an error`) // eslint-disable-line @stylistic/quotes
  console.log(`This should be an "error"`) // eslint-disable-line @stylistic/quotes
  console.log(`This should be an 'error'`) // eslint-disable-line @stylistic/quotes
}
