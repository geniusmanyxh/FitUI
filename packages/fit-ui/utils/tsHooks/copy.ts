

/**
 * 复制文本到剪贴板（自动判断环境使用合适的方法）
 * @param text - 要复制的文本内容
 * @returns Promise<boolean> - 复制成功返回 true，失败返回 false
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {

//判断当前是否是 HTTPS 环境
    const isSecureContext = (): boolean => window.isSecureContext || location.protocol === 'https:';
    if (isSecureContext() && navigator.clipboard && navigator.clipboard.writeText) {
        // HTTPS 环境下使用 Clipboard API
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('使用 Clipboard API 复制失败:', error);
        }
    }

    // 非 HTTPS 或 Clipboard API 不可用时使用 fallback 方法
    return copyToClipboardFallback(text);
};

/**
 * 非 HTTPS 环境下的兼容性方法
 * 使用 document.execCommand 进行复制
 * @param text - 要复制的文本内容
 * @returns boolean - 复制成功返回 true，失败返回 false
 */
const copyToClipboardFallback = (text: string): boolean => {
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // 避免影响页面布局
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return true;
    } catch (error) {
        console.error('使用 fallback 方法复制失败:', error);
        return false;
    }
};
