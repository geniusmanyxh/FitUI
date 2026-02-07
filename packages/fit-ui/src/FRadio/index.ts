import comp from './index.vue'
import groupComp from './RadioGroup.vue'
import { withInstall } from '@utils/install'

const FRadio = withInstall(comp)
const FRadioGroup = withInstall(groupComp)

export { FRadioGroup }
export default FRadio
