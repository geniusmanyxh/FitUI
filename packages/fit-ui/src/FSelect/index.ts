import select from './index.vue'
import option from './Option.vue'
import optionGroup from './OptionGroup.vue'
import { withInstall } from '@utils/install'

const FSelect = withInstall(select)
const FOption = withInstall(option)
const FOptionGroup = withInstall(optionGroup)

export { FOption, FOptionGroup }
export default FSelect
