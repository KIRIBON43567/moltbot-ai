#!/bin/bash
# Localize Clawdbot Control UI to Chinese
# This script replaces English text in the compiled JS with Chinese translations

set -e

# Find the control-ui JS file
CONTROL_UI_DIR=$(npm root -g)/clawdbot/dist/control-ui/assets
JS_FILE=$(ls "$CONTROL_UI_DIR"/index-*.js 2>/dev/null | head -1)

if [ -z "$JS_FILE" ]; then
    echo "Control UI JS file not found, skipping localization"
    exit 0
fi

echo "Localizing Control UI: $JS_FILE"

# Create backup
cp "$JS_FILE" "${JS_FILE}.bak"

# Replace English text with Chinese
# Navigation menu items
sed -i 's/"Chat"/"聊天"/g' "$JS_FILE"
sed -i 's/"Overview"/"概览"/g' "$JS_FILE"
sed -i 's/"Channels"/"频道"/g' "$JS_FILE"
sed -i 's/"Instances"/"实例"/g' "$JS_FILE"
sed -i 's/"Sessions"/"会话"/g' "$JS_FILE"
sed -i 's/"Cron Jobs"/"定时任务"/g' "$JS_FILE"
sed -i 's/"Skills"/"技能"/g' "$JS_FILE"
sed -i 's/"Nodes"/"节点"/g' "$JS_FILE"
sed -i 's/"Config"/"配置"/g' "$JS_FILE"
sed -i 's/"Debug"/"调试"/g' "$JS_FILE"
sed -i 's/"Logs"/"日志"/g' "$JS_FILE"
sed -i 's/"Settings"/"设置"/g' "$JS_FILE"
sed -i 's/"Control"/"控制"/g' "$JS_FILE"
sed -i 's/"Agent"/"代理"/g' "$JS_FILE"

# Buttons and actions
sed -i 's/"Send"/"发送"/g' "$JS_FILE"
sed -i 's/"New session"/"新建会话"/g' "$JS_FILE"
sed -i 's/"Refresh"/"刷新"/g' "$JS_FILE"
sed -i 's/"Save"/"保存"/g' "$JS_FILE"
sed -i 's/"Cancel"/"取消"/g' "$JS_FILE"
sed -i 's/"Delete"/"删除"/g' "$JS_FILE"
sed -i 's/"Edit"/"编辑"/g' "$JS_FILE"
sed -i 's/"Add"/"添加"/g' "$JS_FILE"
sed -i 's/"Close"/"关闭"/g' "$JS_FILE"
sed -i 's/"Start"/"启动"/g' "$JS_FILE"
sed -i 's/"Stop"/"停止"/g' "$JS_FILE"
sed -i 's/"Restart"/"重启"/g' "$JS_FILE"

# Status messages
sed -i 's/"Health Offline"/"健康状态：离线"/g' "$JS_FILE"
sed -i 's/"Health Online"/"健康状态：在线"/g' "$JS_FILE"
sed -i 's/"Disconnected from gateway"/"已断开网关连接"/g' "$JS_FILE"
sed -i 's/"Connected to gateway"/"已连接到网关"/g' "$JS_FILE"
sed -i 's/"Connect to the gateway to start chatting"/"连接到网关以开始聊天"/g' "$JS_FILE"
sed -i 's/"Connecting..."/"连接中..."/g' "$JS_FILE"
sed -i 's/"Loading..."/"加载中..."/g' "$JS_FILE"

# Chat interface
sed -i 's/"Direct gateway chat session for quick interventions"/"直接网关聊天会话，用于快速干预"/g' "$JS_FILE"
sed -i 's/"Type a message..."/"输入消息..."/g' "$JS_FILE"
sed -i 's/"Type your message"/"输入您的消息"/g' "$JS_FILE"

# Error messages
sed -i 's/"Invalid or missing token"/"无效或缺少令牌"/g' "$JS_FILE"
sed -i 's/"Connection failed"/"连接失败"/g' "$JS_FILE"
sed -i 's/"Error"/"错误"/g' "$JS_FILE"
sed -i 's/"Warning"/"警告"/g' "$JS_FILE"
sed -i 's/"Success"/"成功"/g' "$JS_FILE"

# Headers
sed -i 's/"CLAWDBOT"/"MOLTBOT"/g' "$JS_FILE"
sed -i 's/"GATEWAY DASHBOARD"/"网关控制面板"/g' "$JS_FILE"

echo "Localization complete!"
