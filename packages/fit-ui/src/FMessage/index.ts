import message from './index.vue'
import {withInstall} from '@utils/install'
import { useMessage } from '@utils/tsHooks/useMessage'

const FMessage = withInstall(message)

// 添加静态方法 closeAll
FMessage.closeAll = () => {
  const { closeAll } = useMessage()
  closeAll()
}

export default FMessage