import select from './index.vue'
import FOption from '@/FOption'
import FOptionGroup from '@/FOptionGroup'
import { withInstall } from '@utils/install'

const FSelect = withInstall(select)

export { FOption, FOptionGroup }
export default FSelect
