import comp from './index.vue'
import DropdownItemComp from './DropdownItem.vue'
import DropdownMenuComp from './DropdownMenu.vue'
import { withInstall } from '@utils/install'

const FDropdown = withInstall(comp)
const FDropdownItem = withInstall(DropdownItemComp)
const FDropdownMenu = withInstall(DropdownMenuComp)

export default FDropdown
export { FDropdownItem, FDropdownMenu }
