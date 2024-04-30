const msgType = [ 'success', 'error', 'warn', 'info', 'default' ] as const

type MsgType = typeof msgType[number]
// type durationType = number | 'notime'

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



export {msgBgClass}
