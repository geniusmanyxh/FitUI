import comp from './index.vue'
import TabPaneComp from './TabPane.vue'
import { withInstall } from '@utils/install'

const FTabs = withInstall(comp)
const FTabPane = withInstall(TabPaneComp)

export default FTabs
export { FTabPane }
