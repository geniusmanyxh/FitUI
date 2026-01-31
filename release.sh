#!/usr/bin/env bash

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════╗"
echo "║     FitUI 组件库发布流程           ║"
echo "╚════════════════════════════════════╝"
echo -e "${NC}\n"

# 获取脚本所在目录的父目录（项目根目录）
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR"
PACKAGE_DIR="$PROJECT_ROOT/packages/fit-ui"

# 进入组件库目录
cd "$PACKAGE_DIR"

# 1. 检查 Git 状态
echo -e "${YELLOW}[1/9] 检查 Git 状态...${NC}"
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}✗ 错误: 存在未提交的更改${NC}"
  echo -e "${RED}  请先提交或暂存所有更改后再发布${NC}"
  git status --short
  exit 1
fi
echo -e "${GREEN}✓ Git 状态干净${NC}\n"

# 2. 检查当前分支
echo -e "${YELLOW}[2/9] 检查当前分支...${NC}"
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo -e "  当前分支: ${BLUE}$current_branch${NC}"

if [ "$current_branch" != "publish-fit-ui" ]; then
  echo -e "${YELLOW}  建议在 publish-fit-ui 分支发布${NC}"
  read -p "  是否切换到 publish-fit-ui 分支？(y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git checkout publish-fit-ui
    git pull origin publish-fit-ui
    echo -e "${GREEN}✓ 已切换到 publish-fit-ui 分支${NC}\n"
  else
    read -p "  是否继续在当前分支发布？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      echo -e "${YELLOW}取消发布${NC}"
      exit 0
    fi
  fi
else
  echo -e "${GREEN}✓ 分支检查通过${NC}\n"
fi

# 3. 拉取最新代码
echo -e "${YELLOW}[3/9] 拉取最新代码...${NC}"
git pull origin $current_branch
echo -e "${GREEN}✓ 代码已更新${NC}\n"

# 4. 清理并安装依赖
echo -e "${YELLOW}[4/9] 安装依赖...${NC}"
cd "$PROJECT_ROOT"
pnpm install
cd "$PACKAGE_DIR"
echo -e "${GREEN}✓ 依赖安装完成${NC}\n"

# 5. 运行测试
echo -e "${YELLOW}[5/9] 运行单元测试...${NC}"
if ! pnpm test:run; then
  echo -e "${RED}✗ 测试失败，请修复后再发布${NC}"
  exit 1
fi
echo -e "${GREEN}✓ 所有测试通过${NC}\n"

# 6. 代码检查
echo -e "${YELLOW}[6/9] 代码质量检查...${NC}"
if ! pnpm lint; then
  echo -e "${RED}✗ 代码检查未通过${NC}"
  read -p "  是否继续发布？(y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
else
  echo -e "${GREEN}✓ 代码检查通过${NC}\n"
fi

# 7. 清理旧构建产物
echo -e "${YELLOW}[7/9] 清理旧构建产物...${NC}"
rm -rf dist
echo -e "${GREEN}✓ 清理完成${NC}\n"

# 8. 构建
echo -e "${YELLOW}[8/9] 构建组件库...${NC}"
if ! pnpm build; then
  echo -e "${RED}✗ 构建失败${NC}"
  exit 1
fi
echo -e "${GREEN}✓ 构建完成${NC}\n"

# 9. 检查构建产物
echo -e "${YELLOW}[9/9] 验证构建产物...${NC}"
if [ ! -d "dist" ]; then
  echo -e "${RED}✗ dist 目录不存在${NC}"
  exit 1
fi

if [ ! -f "dist/entry.d.ts" ]; then
  echo -e "${RED}✗ 类型声明文件缺失${NC}"
  exit 1
fi

if [ ! -d "dist/es" ] || [ ! -d "dist/lib" ]; then
  echo -e "${RED}✗ 构建产物不完整${NC}"
  exit 1
fi

echo -e "${GREEN}✓ 构建产物验证通过${NC}\n"

# 获取包信息
package_name=$(node -p "require('./package.json').name")
current_version=$(node -p "require('./package.json').version")

echo -e "${BLUE}╔════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          准备发布                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════╝${NC}"
echo -e "  包名: ${GREEN}$package_name${NC}"
echo -e "  版本: ${GREEN}v$current_version${NC}"
echo -e "  分支: ${BLUE}$current_branch${NC}"
echo ""

# 发布确认
read -p "确认发布到 npm？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}✗ 取消发布${NC}"
  exit 0
fi

echo ""
echo -e "${BLUE}╔════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          开始发布                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════╝${NC}"
echo ""

# 配置 npm registry
echo -e "${YELLOW}配置 npm registry...${NC}"
original_registry=$(pnpm config get registry)
echo -e "  原始 registry: ${BLUE}$original_registry${NC}"
pnpm config set registry https://registry.npmjs.org/
echo -e "  发布 registry: ${BLUE}https://registry.npmjs.org/${NC}"
echo -e "${GREEN}✓ Registry 配置完成${NC}\n"

# 检查登录状态
echo -e "${YELLOW}检查 npm 登录状态...${NC}"
if ! pnpm whoami &>/dev/null; then
  echo -e "${YELLOW}需要登录 npm，请按提示操作...${NC}"
  pnpm login
fi
npm_user=$(pnpm whoami)
echo -e "  登录用户: ${GREEN}$npm_user${NC}"
echo -e "${GREEN}✓ 登录状态正常${NC}\n"

# 发布（使用 --no-git-checks 跳过 git 检查，因为我们已经做过了）
echo -e "${YELLOW}正在发布...${NC}"
if pnpm publish --no-git-checks; then
  echo -e "\n${GREEN}╔════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║        🎉 发布成功！               ║${NC}"
  echo -e "${GREEN}╚════════════════════════════════════╝${NC}"
  echo -e "  包名: ${GREEN}$package_name${NC}"
  echo -e "  版本: ${GREEN}v$current_version${NC}"
  echo -e "  查看: ${BLUE}https://www.npmjs.com/package/$package_name${NC}"
  echo ""
  
  # 恢复 registry
  echo -e "${YELLOW}恢复 npm registry...${NC}"
  pnpm config set registry "$original_registry"
  echo -e "${GREEN}✓ Registry 已恢复${NC}\n"
  
  # 创建 Git 标签（可选）
  read -p "是否创建 Git 标签 v$current_version？(y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git tag -a "v$current_version" -m "Release v$current_version"
    echo -e "${GREEN}✓ Git 标签已创建${NC}"
    
    read -p "是否推送标签到远程？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git push origin "v$current_version"
      echo -e "${GREEN}✓ 标签已推送${NC}"
    fi
  fi
  
  echo ""
  echo -e "${GREEN}发布流程全部完成！${NC}"
  
else
  echo -e "\n${RED}╔════════════════════════════════════╗${NC}"
  echo -e "${RED}║          ✗ 发布失败                ║${NC}"
  echo -e "${RED}╚════════════════════════════════════╝${NC}"
  
  # 恢复 registry
  echo -e "${YELLOW}恢复 npm registry...${NC}"
  pnpm config set registry "$original_registry"
  
  exit 1
fi
