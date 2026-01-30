// Moltbot Control UI Chinese Localization Script
// This script runs on page load and translates the UI to Chinese

(function() {
  'use strict';

  // Translation dictionary
  const translations = {
    // Navigation menu
    'Chat': '聊天',
    'Overview': '概览',
    'Channels': '频道',
    'Instances': '实例',
    'Sessions': '会话',
    'Cron Jobs': '定时任务',
    'Skills': '技能',
    'Nodes': '节点',
    'Config': '配置',
    'Debug': '调试',
    'Logs': '日志',
    'Settings': '设置',
    'Control': '控制',
    'Agent': '代理',

    // Buttons
    'Send': '发送',
    'New session': '新建会话',
    'Refresh': '刷新',
    'Save': '保存',
    'Cancel': '取消',
    'Delete': '删除',
    'Edit': '编辑',
    'Add': '添加',
    'Close': '关闭',
    'Start': '启动',
    'Stop': '停止',
    'Restart': '重启',

    // Status
    'Health Offline': '健康状态：离线',
    'Health Online': '健康状态：在线',
    'Disconnected from gateway': '已断开网关连接',
    'Disconnected from gateway.': '已断开网关连接。',
    'Connected to gateway': '已连接到网关',
    'Connect to the gateway to start chatting...': '连接到网关以开始聊天...',
    'Connecting...': '连接中...',
    'Loading...': '加载中...',

    // Chat page
    'Direct gateway chat session for quick interventions.': '直接网关聊天会话，用于快速干预。',
    'Direct gateway chat session for quick interventions': '直接网关聊天会话，用于快速干预',
    'Type a message...': '输入消息...',
    'Type your message': '输入您的消息',

    // Headers
    'CLAWDBOT': 'MOLTBOT',
    'GATEWAY DASHBOARD': '网关控制面板',

    // Errors
    'Invalid or missing token': '无效或缺少令牌',
    'Connection failed': '连接失败',
    'Error': '错误',
    'Warning': '警告',
    'Success': '成功',

    // Common
    'main': '主会话',
    'Name': '名称',
    'Status': '状态',
    'Actions': '操作',
    'Created': '创建时间',
    'Updated': '更新时间',
    'Type': '类型',
    'Value': '值',
    'Description': '描述',
    'Enabled': '已启用',
    'Disabled': '已禁用',
    'Active': '活跃',
    'Inactive': '非活跃',
    'Running': '运行中',
    'Stopped': '已停止',
    'Pending': '等待中',
    'Failed': '失败',
    'Unknown': '未知',
    'None': '无',
    'All': '全部',
    'Select': '选择',
    'Search': '搜索',
    'Filter': '筛选',
    'Sort': '排序',
    'Export': '导出',
    'Import': '导入',
    'Copy': '复制',
    'Paste': '粘贴',
    'Undo': '撤销',
    'Redo': '重做',
    'Help': '帮助',
    'About': '关于',
    'Version': '版本',
    'License': '许可证',
    'Documentation': '文档',
    'Support': '支持',
    'Feedback': '反馈',
    'Report a bug': '报告问题',
    'Request a feature': '功能请求',
    'Privacy': '隐私',
    'Terms': '条款',
    'Logout': '退出登录',
    'Login': '登录',
    'Register': '注册',
    'Forgot password': '忘记密码',
    'Reset password': '重置密码',
    'Change password': '修改密码',
    'Profile': '个人资料',
    'Account': '账户',
    'Preferences': '偏好设置',
    'Notifications': '通知',
    'Language': '语言',
    'Theme': '主题',
    'Dark': '深色',
    'Light': '浅色',
    'Auto': '自动',
    'System': '系统',
  };

  // Function to translate text nodes
  function translateTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text && translations[text]) {
        node.textContent = node.textContent.replace(text, translations[text]);
      }
    }
  }

  // Function to translate an element and its children
  function translateElement(element) {
    // Translate text content
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(translateTextNode);

    // Translate placeholder attributes
    element.querySelectorAll('[placeholder]').forEach(el => {
      const placeholder = el.getAttribute('placeholder');
      if (translations[placeholder]) {
        el.setAttribute('placeholder', translations[placeholder]);
      }
    });

    // Translate title attributes
    element.querySelectorAll('[title]').forEach(el => {
      const title = el.getAttribute('title');
      if (translations[title]) {
        el.setAttribute('title', translations[title]);
      }
    });

    // Translate aria-label attributes
    element.querySelectorAll('[aria-label]').forEach(el => {
      const label = el.getAttribute('aria-label');
      if (translations[label]) {
        el.setAttribute('aria-label', translations[label]);
      }
    });
  }

  // Initial translation
  function init() {
    translateElement(document.body);
  }

  // Observe DOM changes and translate new content
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          translateElement(node);
        } else if (node.nodeType === Node.TEXT_NODE) {
          translateTextNode(node);
        }
      });
    });
  });

  // Start observing when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  } else {
    init();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
})();
