const msgType = [ 'success', 'error', 'warn', 'info', 'default' ] as const

type MsgType = typeof msgType[number]

const msgBgClass: Record<MsgType, string>  = {
  success: "",
  error: "",
  warn: "",
  info: "",
  default: ""
}

msgType.forEach(item => {
  msgBgClass[item] = `msg_${item}`
})