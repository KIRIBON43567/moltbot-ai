import { useState, useEffect, useCallback } from 'react'
import {
  listDevices,
  approveDevice,
  approveAllDevices,
  restartGateway,
  getStorageStatus,
  triggerSync,
  AuthError,
  type PendingDevice,
  type PairedDevice,
  type DeviceListResponse,
  type StorageStatusResponse,
} from '../api'
import { useI18n } from '../i18n'
import './AdminPage.css'

// Small inline spinner for buttons
function ButtonSpinner() {
  return <span className="btn-spinner" />
}

export default function AdminPage() {
  const { t, language } = useI18n()
  const [pending, setPending] = useState<PendingDevice[]>([])
  const [paired, setPaired] = useState<PairedDevice[]>([])
  const [storageStatus, setStorageStatus] = useState<StorageStatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)
  const [restartInProgress, setRestartInProgress] = useState(false)
  const [syncInProgress, setSyncInProgress] = useState(false)

  const fetchDevices = useCallback(async () => {
    try {
      setError(null)
      const data: DeviceListResponse = await listDevices()
      setPending(data.pending || [])
      setPaired(data.paired || [])
      
      if (data.error) {
        setError(data.error)
      } else if (data.parseError) {
        setError(`${t.parseError}${data.parseError}`)
      }
    } catch (err) {
      if (err instanceof AuthError) {
        setError(t.authRequired)
      } else {
        setError(err instanceof Error ? err.message : t.failedToFetch)
      }
    } finally {
      setLoading(false)
    }
  }, [t])

  const fetchStorageStatus = useCallback(async () => {
    try {
      const status = await getStorageStatus()
      setStorageStatus(status)
    } catch (err) {
      // Don't show error for storage status - it's not critical
      console.error('Failed to fetch storage status:', err)
    }
  }, [])

  useEffect(() => {
    fetchDevices()
    fetchStorageStatus()
  }, [fetchDevices, fetchStorageStatus])

  const handleApprove = async (requestId: string) => {
    setActionInProgress(requestId)
    try {
      const result = await approveDevice(requestId)
      if (result.success) {
        // Refresh the list
        await fetchDevices()
      } else {
        setError(result.error || t.approvalFailed)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.failedToApprove)
    } finally {
      setActionInProgress(null)
    }
  }

  const handleApproveAll = async () => {
    if (pending.length === 0) return
    
    setActionInProgress('all')
    try {
      const result = await approveAllDevices()
      if (result.failed && result.failed.length > 0) {
        setError(language === 'zh' 
          ? `批准 ${result.failed.length} 个设备失败`
          : `Failed to approve ${result.failed.length} device(s)`)
      }
      // Refresh the list
      await fetchDevices()
    } catch (err) {
      setError(err instanceof Error ? err.message : t.failedToApprove)
    } finally {
      setActionInProgress(null)
    }
  }

  const handleRestartGateway = async () => {
    if (!confirm(t.restartConfirm)) {
      return
    }
    
    setRestartInProgress(true)
    try {
      const result = await restartGateway()
      if (result.success) {
        setError(null)
        // Show success message briefly
        alert(t.restartSuccess)
      } else {
        setError(result.error || t.failedToRestart)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.failedToRestart)
    } finally {
      setRestartInProgress(false)
    }
  }

  const handleSync = async () => {
    setSyncInProgress(true)
    try {
      const result = await triggerSync()
      if (result.success) {
        // Update the storage status with new lastSync time
        setStorageStatus(prev => prev ? { ...prev, lastSync: result.lastSync || null } : null)
        setError(null)
      } else {
        setError(result.error || t.failedToSync)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.failedToSync)
    } finally {
      setSyncInProgress(false)
    }
  }

  const formatSyncTime = (isoString: string | null) => {
    if (!isoString) return t.never
    try {
      const date = new Date(isoString)
      return date.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')
    } catch {
      return isoString
    }
  }

  const formatTimestamp = (ts: number) => {
    const date = new Date(ts)
    return date.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')
  }

  const formatTimeAgo = (ts: number) => {
    const seconds = Math.floor((Date.now() - ts) / 1000)
    if (seconds < 60) return `${seconds}${t.secondsAgo}`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}${t.minutesAgo}`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}${t.hoursAgo}`
    const days = Math.floor(hours / 24)
    return `${days}${t.daysAgo}`
  }

  return (
    <div className="devices-page">
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="dismiss-btn">
            {t.dismiss}
          </button>
        </div>
      )}

      {storageStatus && !storageStatus.configured && (
        <div className="warning-banner">
          <div className="warning-content">
            <strong>{t.storageNotConfigured}</strong>
            <p>
              {t.storageNotConfiguredDesc}
              {' '}
              <a href="https://github.com/cloudflare/moltworker" target="_blank" rel="noopener noreferrer">
                {language === 'zh' ? '查看设置说明' : 'See README for setup instructions'}
              </a>
            </p>
            {storageStatus.missing && (
              <p className="missing-secrets">
                {t.storageMissing}{storageStatus.missing.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      {storageStatus?.configured && (
        <div className="success-banner">
          <div className="storage-status">
            <div className="storage-info">
              <span>{t.storageConfigured}</span>
              <span className="last-sync">
                {t.lastBackup}{formatSyncTime(storageStatus.lastSync)}
              </span>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleSync}
              disabled={syncInProgress}
            >
              {syncInProgress && <ButtonSpinner />}
              {syncInProgress ? t.syncing : t.backupNow}
            </button>
          </div>
        </div>
      )}

      <section className="devices-section gateway-section">
        <div className="section-header">
          <h2>{t.gatewayControls}</h2>
          <button
            className="btn btn-danger"
            onClick={handleRestartGateway}
            disabled={restartInProgress}
          >
            {restartInProgress && <ButtonSpinner />}
            {restartInProgress ? t.restarting : t.restartGateway}
          </button>
        </div>
        <p className="hint">
          {t.restartHint}
        </p>
      </section>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>{t.loadingDevices}</p>
        </div>
      ) : (
        <>
          <section className="devices-section">
        <div className="section-header">
          <h2>{t.pendingRequests}</h2>
          <div className="header-actions">
            {pending.length > 0 && (
              <button
                className="btn btn-primary"
                onClick={handleApproveAll}
                disabled={actionInProgress !== null}
              >
                {actionInProgress === 'all' && <ButtonSpinner />}
                {actionInProgress === 'all' ? t.approving : `${t.approveAll} (${pending.length})`}
              </button>
            )}
            <button className="btn btn-secondary" onClick={fetchDevices} disabled={loading}>
              {t.refresh}
            </button>
          </div>
        </div>

        {pending.length === 0 ? (
          <div className="empty-state">
            <p>{t.noPendingRequests}</p>
            <p className="hint">
              {t.pendingHint}
            </p>
          </div>
        ) : (
          <div className="devices-grid">
            {pending.map((device) => (
              <div key={device.requestId} className="device-card pending">
                <div className="device-header">
                  <span className="device-name">
                    {device.displayName || device.deviceId || t.unknownDevice}
                  </span>
                  <span className="device-badge pending">{t.pending}</span>
                </div>
                <div className="device-details">
                  {device.platform && (
                    <div className="detail-row">
                      <span className="label">{t.platform}:</span>
                      <span className="value">{device.platform}</span>
                    </div>
                  )}
                  {device.clientId && (
                    <div className="detail-row">
                      <span className="label">{t.client}:</span>
                      <span className="value">{device.clientId}</span>
                    </div>
                  )}
                  {device.clientMode && (
                    <div className="detail-row">
                      <span className="label">{t.mode}:</span>
                      <span className="value">{device.clientMode}</span>
                    </div>
                  )}
                  {device.role && (
                    <div className="detail-row">
                      <span className="label">{t.role}:</span>
                      <span className="value">{device.role}</span>
                    </div>
                  )}
                  {device.remoteIp && (
                    <div className="detail-row">
                      <span className="label">{t.ip}:</span>
                      <span className="value">{device.remoteIp}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="label">{t.requested}:</span>
                    <span className="value" title={formatTimestamp(device.ts)}>
                      {formatTimeAgo(device.ts)}
                    </span>
                  </div>
                </div>
                <div className="device-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => handleApprove(device.requestId)}
                    disabled={actionInProgress !== null}
                  >
                    {actionInProgress === device.requestId && <ButtonSpinner />}
                    {actionInProgress === device.requestId ? t.approving : t.approve}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="devices-section">
        <div className="section-header">
          <h2>{t.pairedDevices}</h2>
        </div>

        {paired.length === 0 ? (
          <div className="empty-state">
            <p>{t.noPairedDevices}</p>
          </div>
        ) : (
          <div className="devices-grid">
            {paired.map((device, index) => (
              <div key={device.deviceId || index} className="device-card paired">
                <div className="device-header">
                  <span className="device-name">
                    {device.displayName || device.deviceId || t.unknownDevice}
                  </span>
                  <span className="device-badge paired">{t.paired}</span>
                </div>
                <div className="device-details">
                  {device.platform && (
                    <div className="detail-row">
                      <span className="label">{t.platform}:</span>
                      <span className="value">{device.platform}</span>
                    </div>
                  )}
                  {device.clientId && (
                    <div className="detail-row">
                      <span className="label">{t.client}:</span>
                      <span className="value">{device.clientId}</span>
                    </div>
                  )}
                  {device.clientMode && (
                    <div className="detail-row">
                      <span className="label">{t.mode}:</span>
                      <span className="value">{device.clientMode}</span>
                    </div>
                  )}
                  {device.role && (
                    <div className="detail-row">
                      <span className="label">{t.role}:</span>
                      <span className="value">{device.role}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="label">{t.pairedAt}:</span>
                    <span className="value" title={formatTimestamp(device.approvedAtMs)}>
                      {formatTimeAgo(device.approvedAtMs)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
        </>
      )}
    </div>
  )
}
