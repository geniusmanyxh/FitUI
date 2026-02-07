import breadcrumb from './index.vue'
import BreadcrumbItemComp from './BreadcrumbItem.vue'
import { withInstall } from '@utils/install'

const FBreadcrumb = withInstall(breadcrumb)
const FBreadcrumbItem = withInstall(BreadcrumbItemComp)

export default FBreadcrumb
export { FBreadcrumbItem }
