import comp from './index.vue'
import { withInstall } from '@utils/install'
import vLoading from './directive'

const FLoading = withInstall(comp)

// 导出指令
FLoading.directive = vLoading

export default FLoading
export { vLoading }
