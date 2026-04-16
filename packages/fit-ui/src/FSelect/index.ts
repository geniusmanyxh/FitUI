import select from './index.vue'
import option from './Option.vue'
import { withInstall } from '@utils/install'

const FSelect = withInstall(select)
const FOption = withInstall(option)

export default FSelect
export { FOption }
