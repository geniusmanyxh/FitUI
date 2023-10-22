

const btnType = ['default','primary','success', 'info', 'warning', 'danger'] as const
const btnClass:{[key:string]:string} = {}

type ButtonType =typeof btnType[number]

btnType.forEach(val => {
  btnClass[val] =`${val}_button`
})

export {type ButtonType, btnClass}


