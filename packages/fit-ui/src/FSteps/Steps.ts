export interface StepsProps {
  active?: number
  direction?: 'horizontal' | 'vertical'
  finishStatus?: 'wait' | 'process' | 'finish' | 'error'
  processStatus?: 'wait' | 'process' | 'finish' | 'error'
  simple?: boolean
  alignCenter?: boolean
}

export interface StepsProvideValue {
  props: StepsProps
  stepCount: number
  updateStepCount: (count: number) => void
}

export const stepsPropsKey = 'stepsProps' as const
