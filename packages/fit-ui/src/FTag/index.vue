<template>
  <span :class="['tag', type, size, mode, { disabled: disabled, round: round }]">
    <slot name="label">{{ label }}</slot>
    <span v-if="closable" class="close-btn" :class="{ disabled: disabled }" @click.stop="handleClose">
      <slot name="close">
        <FIcon icon="close"></FIcon>
      </slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import FIcon from '@/FIcon';
defineOptions({
  name: 'FTag',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  label?: string;
  mode?: 'dark' | 'light' | 'plain';
  type?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default';
  size?: 'mini' | 'small' | 'medium' | 'large';
  closable?: boolean;
  disabled?: boolean;
  closeHoverColor?: string;
  closeColor?: string; // Custom close button color on hover
  round?: boolean; // Rounded corners
  bgColor?: string; // Custom background color
  textColor?: string; // Custom text color
  borderColor?: string; // Custom border color
}>(), {
  closable: false,
  disabled: false,
  closeColor: '', // Default close button color on hover
  closeHoverColor: '',
  mode: 'dark', // Default mode
  type: 'default', // Default type
  size: 'medium', // Default size
  label: '', // Default label
  round: false, // Default round value
  bgColor: '', // No default background color
  textColor: '', // No default text color
  borderColor: '', // No default border color
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleClose = () => {
  if (!props.disabled) {
    emit('close');
  }
};

const tagBgColor = ref('#000000')
const tagTextColor = ref('#ffffff')
const tagBorderColor = ref('#000000')
const tagCloseColor = ref('#000000');
const tagCloseHoverColor = ref('#ffffff');
const tagCloseSize = ref('20px');
const tagCloseBorderRadius = ref('10px');
const tagCloseMarginLeft = ref('8px');

const tagDisabledBgColor = ref('#c8c9cc');
const tagDisabledTextColor = ref('#fefffe');
const tagDisabledBorderColor = ref('#c8c9cc');


const customConfig = () => {
  if (props.bgColor) {
    tagBgColor.value = props.bgColor;
  }
  if (props.textColor) {
    tagTextColor.value = props.textColor;
  }
  if (props.borderColor) {
    tagBorderColor.value = props.borderColor;
  }
}

const changeCloseBtnConfig = () => {
  switch (props.size) {
    case 'mini':
      tagCloseSize.value = '12px';
      tagCloseBorderRadius.value = '6px';
      tagCloseMarginLeft.value = '3px';
      break;
    case 'small':
      tagCloseSize.value = '14px';
      tagCloseBorderRadius.value = '7px';
      tagCloseMarginLeft.value = '5px';
      break;
    case 'medium':
      tagCloseSize.value = '16px';
      tagCloseBorderRadius.value = '8px';
      tagCloseMarginLeft.value = '8px';
      break;
    case 'large':
      tagCloseSize.value = '24px';
      tagCloseBorderRadius.value = '12px';
      tagCloseMarginLeft.value = '8px';
      break;
    default:
      break;
  }
};
const changeConfig = () => {
  if (props.mode === 'dark') {
    switch (props.type) {
      case 'default':
        tagBgColor.value = '#000000';
        tagTextColor.value = '#ffffff';
        tagBorderColor.value = '#000000';
        tagCloseColor.value = '#000000';
        tagCloseHoverColor.value = '#ffffff';
        tagDisabledBgColor.value = '#dcdcdc';
        tagDisabledTextColor.value = '#ffffff';
        tagDisabledBorderColor.value = '#dcdcdc';
        break;
      case 'success':
        tagBgColor.value = '#22c55e';
        tagTextColor.value = '#ffffff';
        tagBorderColor.value = '#22c55e';
        tagCloseColor.value = '#22c55e';
        tagCloseHoverColor.value = '#dcfce7';

        tagDisabledBgColor.value = '#b3e19d';
        tagDisabledTextColor.value = '#ffffff';
        tagDisabledBorderColor.value = '#b3e19d';
        break;
      case 'primary':
        tagBgColor.value = '#3b82f6';
        tagTextColor.value = '#ffffff';
        tagBorderColor.value = '#3b82f6';
        tagCloseColor.value = '#3b82f6';
        tagCloseHoverColor.value = '#dbeafe';

        tagDisabledBgColor.value = '#a0cfff';
        tagDisabledTextColor.value = '#ffffff';
        tagDisabledBorderColor.value = '#a0cfff';
        break;
      case 'warning':
        tagBgColor.value = '#eab308';
        tagTextColor.value = '#ffffff';
        tagBorderColor.value = '#eab308';
        tagCloseColor.value = '#eab308';
        tagCloseHoverColor.value = '#fef9c3';

        tagDisabledBgColor.value = '#f3d19e';
        tagDisabledTextColor.value = '#ffffff';
        tagDisabledBorderColor.value = '#f3d19e';
        break;
      case 'info':
        tagBgColor.value = '#6b7280';
        tagTextColor.value = '#ffffff';
        tagBorderColor.value = '#6b7280';
        tagCloseColor.value = '#6b7280';
        tagCloseHoverColor.value = '#e5e7eb';

        tagDisabledBgColor.value = '#c8c9cc';
        tagDisabledTextColor.value = '#ffffff';
        tagDisabledBorderColor.value = '#c8c9cc';
        break;
      case 'danger':
        tagBgColor.value = '#ef4444';
        tagTextColor.value = '#ffffff';
        tagBorderColor.value = '#ef4444';
        tagCloseColor.value = '#ef4444';
        tagCloseHoverColor.value = '#fee2e2';

        tagDisabledBgColor.value = '#fab6b6';
        tagDisabledTextColor.value = '#ffffff';
        tagDisabledBorderColor.value = '#fab6b6';
        break;
      // default:
      //   tagBgColor.value = '#000000';
      //   tagTextColor.value = '#ffffff';
      //   tagBorderColor.value = '#000000';
      //   tagCloseColor.value = '#000000';
      //   tagCloseHoverColor.value = '#ffffff';
      //   break;
    }
  } else if (props.mode === 'light') {
    switch (props.type) {
      case 'default':
        tagBgColor.value = '#e5e7eb';
        tagTextColor.value = '#000000';
        tagBorderColor.value = '#e5e7eb';
        tagCloseColor.value = '#e5e7eb';
        tagCloseHoverColor.value = '#000000';

        tagDisabledBgColor.value = '#ffffff';
        tagDisabledTextColor.value = '#a8abb2';
        tagDisabledBorderColor.value = '#e4e7ed';
        break;
      case 'success':
        tagBgColor.value = '#dcfce7';
        tagTextColor.value = '#22c55e';
        tagBorderColor.value = '#dcfce7';
        tagCloseColor.value = '#dcfce7';
        tagCloseHoverColor.value = '#22c55e';

        tagDisabledBgColor.value = '#f0f9eb';
        tagDisabledTextColor.value = '#b3e19d';
        tagDisabledBorderColor.value = '#e1f3d8';
        break;
      case 'primary':
        tagBgColor.value = '#dbeafe';
        tagTextColor.value = '#3b82f6';
        tagBorderColor.value = '#dbeafe';
        tagCloseColor.value = '#dbeafe';
        tagCloseHoverColor.value = '#3b82f6';

        tagDisabledBgColor.value = '#ecf5ff';
        tagDisabledTextColor.value = '#a0cfff';
        tagDisabledBorderColor.value = '#d9ecff';
        break;
      case 'warning':
        tagBgColor.value = '#fef9c3';
        tagTextColor.value = '#eab308';
        tagBorderColor.value = '#fef9c3';
        tagCloseColor.value = '#fef9c3';
        tagCloseHoverColor.value = '#eab308';

        tagDisabledBgColor.value = '#fdf6ec';
        tagDisabledTextColor.value = '#f3d19e';
        tagDisabledBorderColor.value = '#faecd8';
        break;
      case 'info':
        tagBgColor.value = '#f3f4f6';
        tagTextColor.value = '#6b7280';
        tagBorderColor.value = '#f3f4f6';
        tagCloseColor.value = '#f3f4f6';
        tagCloseHoverColor.value = '#6b7280';

        tagDisabledBgColor.value = '#f4f4f5';
        tagDisabledTextColor.value = '#c8c9cc';
        tagDisabledBorderColor.value = '#e9e9eb';
        break;
      case 'danger':
        tagBgColor.value = '#fee2e2';
        tagTextColor.value = '#ef4444';
        tagBorderColor.value = '#fee2e2';
        tagCloseColor.value = '#fee2e2';
        tagCloseHoverColor.value = '#ef4444';

        tagDisabledBgColor.value = '#fef0f0';
        tagDisabledTextColor.value = '#fab6b6';
        tagDisabledBorderColor.value = '#fde2e2';
        break;
      // default:
      //   tagBgColor.value = '#e5e7eb';
      //   tagTextColor.value = '#000000';
      //   tagBorderColor.value = '#000000';
      //   tagCloseColor.value = '#e5e7eb';
      //   tagCloseHoverColor.value = '#000000';
      //   break;
    }
  } else if (props.mode === 'plain') {
    switch (props.type) {
      case 'default':
        tagBgColor.value = '#ffffff';
        tagTextColor.value = '#000000';
        tagBorderColor.value = '#000000';
        tagCloseColor.value = '#e5e7eb';
        tagCloseHoverColor.value = '#000000';

        tagDisabledBgColor.value = '#ffffff';
        tagDisabledTextColor.value = '#a8abb2';
        tagDisabledBorderColor.value = '#e4e7ed';
        break;
      case 'success':
        tagBgColor.value = '#ffffff';
        tagTextColor.value = '#22c55e';
        tagBorderColor.value = '#dcfce7';
        tagCloseColor.value = '#dcfce7';
        tagCloseHoverColor.value = '#22c55e';

        tagDisabledBgColor.value = '#ffffff';
        tagDisabledTextColor.value = '#b3e19d';
        tagDisabledBorderColor.value = '#e1f3d8';
        break;
      case 'primary':
        tagBgColor.value = '#ffffff';
        tagTextColor.value = '#3b82f6';
        tagBorderColor.value = '#dbeafe';
        tagCloseColor.value = '#dbeafe';
        tagCloseHoverColor.value = '#3b82f6';

        tagDisabledBgColor.value = '#ffffff';
        tagDisabledTextColor.value = '#a0cfff';
        tagDisabledBorderColor.value = '#d9ecff';
        break;
      case 'warning':
        tagBgColor.value = '#ffffff';
        tagTextColor.value = '#eab308';
        tagBorderColor.value = '#fef9c3';
        tagCloseColor.value = '#fef9c3';
        tagCloseHoverColor.value = '#eab308';

        tagDisabledBgColor.value = '#ffffff';
        tagDisabledTextColor.value = '#f3d19e';
        tagDisabledBorderColor.value = '#faecd8';
        break;
      case 'info':
        tagBgColor.value = '#ffffff';
        tagTextColor.value = '#6b7280';
        tagBorderColor.value = '#f3f4f6';
        tagCloseColor.value = '#f3f4f6';
        tagCloseHoverColor.value = '#6b7280';

        tagDisabledBgColor.value = '#ffffff';
        tagDisabledTextColor.value = '#c8c9cc';
        tagDisabledBorderColor.value = '#e9e9eb';
        break;
      case 'danger':
        tagBgColor.value = '#ffffff';
        tagTextColor.value = '#ef4444';
        tagBorderColor.value = '#fee2e2';
        tagCloseColor.value = '#fee2e2';
        tagCloseHoverColor.value = '#ef4444';

        tagDisabledBgColor.value = '#ffffff';
        tagDisabledTextColor.value = '#fab6b6';
        tagDisabledBorderColor.value = '#fde2e2';
        break;
      // default:
      //   tagBgColor.value = '#e5e7eb';
      //   tagTextColor.value = '#000000';
      //   tagBorderColor.value = '#000000';
      //   tagCloseColor.value = '#e5e7eb';
      //   tagCloseHoverColor.value = '#000000';
      //   break;
    }
  }
  customConfig()
  changeCloseBtnConfig()
}




watch(() => props, () => {
  changeConfig()
}, {
  deep: true,
  immediate: true,
})
</script>

<style scoped lang="scss">
$bgColor: v-bind(tagBgColor);
$textColor: v-bind(tagTextColor);
$borderColor: v-bind(tagBorderColor);
$closeColor: v-bind(tagCloseColor);
$closeHoverColor: v-bind(tagCloseHoverColor);
$closeSize: v-bind(tagCloseSize);
$closeBorderRadius: v-bind(tagCloseBorderRadius);
$closeMarginLeft: v-bind(tagCloseMarginLeft);
$disabledBgColor: v-bind(tagDisabledBgColor);
$disabledTextColor: v-bind(tagDisabledTextColor);
$disabledBorderColor: v-bind(tagDisabledBorderColor);

.tag {
  height: fit-content;
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  // color: #dcdcdc;
  /* 0.2rem 0.6rem */
  font-size: 16px;
  /* 0.875rem */

  line-height: 22px;
  /* 1.25rem */
  border-radius: 3px;
  white-space: nowrap;
  cursor: pointer;
  background-color: $bgColor;
  color: $textColor;
  border: 1px solid $borderColor;
  box-sizing: border-box;

  .close-btn {
    margin-left: $closeMarginLeft;
    font-size: $closeSize;
    display: inline-flex;
    align-items: center;
    line-height: 1;
    position: relative;

    &.disabled {
      cursor: not-allowed;
      pointer-events: none;
    }

    &:hover {
      color: $closeColor;

      &::before {
        width: $closeSize;
        height: $closeSize;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border-radius: $closeBorderRadius;
        background-color: $closeHoverColor;
      }

    }
  }

  &.round {
    border-radius: 16px;
    /* Large border radius for rounded corners */
  }

  &.disabled {
    background-color: $disabledBgColor;
    color: $disabledTextColor;
    opacity: 0.8;
    cursor: not-allowed;
    border: 1px solid $disabledBorderColor;
  }

  &.mini {
    padding: 2px 8px !important;
    font-size: 12px;
    line-height: 16px;

    .close-btn {
      font-size: 12px;
    }

    &.round {
      border-radius: 10px;
      /* Large border radius for rounded corners */
    }
  }

  &.small {
    padding: 2px 8px;
    /* 0.1rem 0.4rem */
    font-size: 14px;
    /* 0.75rem */
    line-height: 18px;

    /* 1rem */
    &.round {
      border-radius: 14px;
      /* Large border radius for rounded corners */
    }
  }

  &.large {
    padding: 6px 16px;
    /* 0.3rem 0.8rem */
    font-size: 18px;
    /* 1rem */
    line-height: 26px;

    /* 1.5rem */
    &.round {
      border-radius: 20px;
      /* Large border radius for rounded corners */
    }
  }



  // .close-btn {
  //   margin-left: 8px;
  //   /* 0.5rem */
  //   cursor: pointer;
  //   font-weight: bold;

  //   &.disabled {
  //     cursor: not-allowed;
  //     color: #adb5bd;
  //   }

  //   &:hover {
  //     color: v-bind(closeColor);
  //     /* Custom close button color on hover */
  //   }
  // }
}
</style>
