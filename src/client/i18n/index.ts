import { createContext, useContext } from 'react'

// 支持的语言
export type Language = 'zh' | 'en'

// 翻译文本类型
export interface Translations {
  // 页面标题
  adminTitle: string
  
  // 错误消息
  authRequired: string
  parseError: string
  approvalFailed: string
  failedToApprove: string
  failedToFetch: string
  failedToRestart: string
  failedToSync: string
  dismiss: string
  
  // 存储状态
  storageNotConfigured: string
  storageNotConfiguredDesc: string
  storageMissing: string
  storageConfigured: string
  lastBackup: string
  never: string
  backupNow: string
  syncing: string
  
  // 网关控制
  gatewayControls: string
  restartGateway: string
  restarting: string
  restartHint: string
  restartConfirm: string
  restartSuccess: string
  
  // 设备管理
  pendingRequests: string
  approveAll: string
  approving: string
  refresh: string
  noPendingRequests: string
  pendingHint: string
  pairedDevices: string
  noPairedDevices: string
  
  // 设备卡片
  unknownDevice: string
  pending: string
  paired: string
  platform: string
  client: string
  mode: string
  role: string
  ip: string
  requested: string
  pairedAt: string
  approve: string
  
  // 时间格式
  secondsAgo: string
  minutesAgo: string
  hoursAgo: string
  daysAgo: string
  
  // 加载状态
  loadingDevices: string
  
  // 语言切换
  language: string
  chinese: string
  english: string
}

// 中文翻译
export const zhTranslations: Translations = {
  adminTitle: 'Moltbot 管理后台',
  
  authRequired: '需要身份验证。请通过 Cloudflare Access 登录。',
  parseError: '解析错误：',
  approvalFailed: '批准失败',
  failedToApprove: '批准设备失败',
  failedToFetch: '获取设备列表失败',
  failedToRestart: '重启网关失败',
  failedToSync: '同步失败',
  dismiss: '关闭',
  
  storageNotConfigured: 'R2 存储未配置',
  storageNotConfiguredDesc: '容器重启后，已配对的设备和对话记录将会丢失。请配置 R2 凭证以启用持久化存储。',
  storageMissing: '缺少配置：',
  storageConfigured: 'R2 存储已配置。您的数据将在容器重启后保留。',
  lastBackup: '上次备份：',
  never: '从未',
  backupNow: '立即备份',
  syncing: '同步中...',
  
  gatewayControls: '网关控制',
  restartGateway: '重启网关',
  restarting: '重启中...',
  restartHint: '重启网关以应用配置更改或从错误中恢复。所有已连接的客户端将暂时断开连接。',
  restartConfirm: '确定要重启网关吗？这将暂时断开所有客户端的连接。',
  restartSuccess: '网关重启已启动。客户端将自动重新连接。',
  
  pendingRequests: '待处理的配对请求',
  approveAll: '全部批准',
  approving: '批准中...',
  refresh: '刷新',
  noPendingRequests: '没有待处理的配对请求',
  pendingHint: '当设备尝试连接但尚未配对时，将显示在此处。',
  pairedDevices: '已配对设备',
  noPairedDevices: '没有已配对的设备',
  
  unknownDevice: '未知设备',
  pending: '待处理',
  paired: '已配对',
  platform: '平台',
  client: '客户端',
  mode: '模式',
  role: '角色',
  ip: 'IP 地址',
  requested: '请求时间',
  pairedAt: '配对时间',
  approve: '批准',
  
  secondsAgo: '秒前',
  minutesAgo: '分钟前',
  hoursAgo: '小时前',
  daysAgo: '天前',
  
  loadingDevices: '正在加载设备...',
  
  language: '语言',
  chinese: '中文',
  english: 'English',
}

// 英文翻译
export const enTranslations: Translations = {
  adminTitle: 'Moltbot Admin',
  
  authRequired: 'Authentication required. Please log in via Cloudflare Access.',
  parseError: 'Parse error: ',
  approvalFailed: 'Approval failed',
  failedToApprove: 'Failed to approve device',
  failedToFetch: 'Failed to fetch devices',
  failedToRestart: 'Failed to restart gateway',
  failedToSync: 'Failed to sync',
  dismiss: 'Dismiss',
  
  storageNotConfigured: 'R2 Storage Not Configured',
  storageNotConfiguredDesc: 'Paired devices and conversations will be lost when the container restarts. To enable persistent storage, configure R2 credentials.',
  storageMissing: 'Missing: ',
  storageConfigured: 'R2 storage is configured. Your data will persist across container restarts.',
  lastBackup: 'Last backup: ',
  never: 'Never',
  backupNow: 'Backup Now',
  syncing: 'Syncing...',
  
  gatewayControls: 'Gateway Controls',
  restartGateway: 'Restart Gateway',
  restarting: 'Restarting...',
  restartHint: 'Restart the gateway to apply configuration changes or recover from errors. All connected clients will be temporarily disconnected.',
  restartConfirm: 'Are you sure you want to restart the gateway? This will disconnect all clients temporarily.',
  restartSuccess: 'Gateway restart initiated. Clients will reconnect automatically.',
  
  pendingRequests: 'Pending Pairing Requests',
  approveAll: 'Approve All',
  approving: 'Approving...',
  refresh: 'Refresh',
  noPendingRequests: 'No pending pairing requests',
  pendingHint: 'Devices will appear here when they attempt to connect without being paired.',
  pairedDevices: 'Paired Devices',
  noPairedDevices: 'No paired devices',
  
  unknownDevice: 'Unknown Device',
  pending: 'Pending',
  paired: 'Paired',
  platform: 'Platform',
  client: 'Client',
  mode: 'Mode',
  role: 'Role',
  ip: 'IP',
  requested: 'Requested',
  pairedAt: 'Paired',
  approve: 'Approve',
  
  secondsAgo: 's ago',
  minutesAgo: 'm ago',
  hoursAgo: 'h ago',
  daysAgo: 'd ago',
  
  loadingDevices: 'Loading devices...',
  
  language: 'Language',
  chinese: '中文',
  english: 'English',
}

// 获取翻译
export function getTranslations(lang: Language): Translations {
  return lang === 'zh' ? zhTranslations : enTranslations
}

// 语言上下文
export interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

export const I18nContext = createContext<I18nContextType | null>(null)

// 使用国际化 Hook
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

// 获取默认语言（从浏览器或 localStorage）
export function getDefaultLanguage(): Language {
  // 优先从 localStorage 读取
  const stored = localStorage.getItem('moltbot-language')
  if (stored === 'zh' || stored === 'en') {
    return stored
  }
  
  // 默认使用中文
  return 'zh'
}

// 保存语言设置
export function saveLanguage(lang: Language): void {
  localStorage.setItem('moltbot-language', lang)
}
