import skeleton from './index.vue'
import skeletonItem from './SkeletonItem.vue'
import { withInstall } from '@utils/install'

const FSkeleton = withInstall(skeleton)
const FSkeletonItem = withInstall(skeletonItem)

export { FSkeletonItem }
export default FSkeleton
