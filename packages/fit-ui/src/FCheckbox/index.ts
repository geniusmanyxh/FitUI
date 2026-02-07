import comp from './index.vue'
import groupComp from './CheckboxGroup.vue'
import { withInstall } from '@utils/install'

const FCheckbox = withInstall(comp)
const FCheckboxGroup = withInstall(groupComp)

export { FCheckboxGroup }
export default FCheckbox
