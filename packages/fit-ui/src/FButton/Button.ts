export const btnType = ['default', 'primary', 'success', 'info', 'warning', 'danger'] as const

export type ButtonType = (typeof btnType)[number]

export type NativeType = 'button' | 'submit' | 'reset'

const btnClass: { [key: string]: string } = {}

btnType.forEach((val) => {
  btnClass[val] = `${val}_button`
})

export { btnClass }
