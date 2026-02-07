import button from "./index.vue";
import buttonGroup from "./ButtonGroup.vue";
import { withInstall } from '@utils/install'

const FButton = withInstall(button)
const FButtonGroup = withInstall(buttonGroup)

export { FButtonGroup }
export default FButton

