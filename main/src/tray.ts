import path from 'path'
import { app, Tray, Menu, shell, nativeImage, dialog } from 'electron'
import { checkForUpdates, UpdateState } from './updates'
import { config } from './config'

let tray: Tray

export function createTray () {
  tray = new Tray(
    nativeImage.createFromPath(path.join(__dirname, process.env.STATIC!, process.platform === 'win32' ? 'icon.ico' : 'icon.png'))
  )

  tray.setToolTip('Awakened PoE Trade Simplified Chinese')
  rebuildTrayMenu()
}

export function rebuildTrayMenu () {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '设置',
      click: () => {
        dialog.showMessageBox({ title: 'Settings', message: `打开流放之路客户端并且按下 "${config.get('overlayKey')}" 点击齿轮图标.` })
      }
    },
    { type: 'separator' },
    {
      label: `APT简中版本: v${app.getVersion()}`,
      click: () => {
        shell.openExternal('https://github.com/Traveller-hongchen/awakened-poe-trade/releases')
      }
    },
    {
      label: UpdateState.canCheck ? 'Check for updates' : UpdateState.status,
      sublabel: UpdateState.canCheck ? UpdateState.status : undefined,
      enabled: UpdateState.canCheck,
      click: checkForUpdates
    },
    {
      label: '打开日志目录',
      click: () => {
        shell.openPath(path.join(app.getPath('userData'), 'apt-data'))
      }
    },
    { type: 'separator' },
    {
      label: '支持原作者',
      click: () => {
        shell.openExternal('https://patreon.com/awakened_poe_trade')
      }
    },
    {
      label: '支持简中作者',
      click: () => {
        shell.openExternal('https://afdian.net/a/APTSimplifiedChinese/plan')
      }
    },
    {
      label: 'Discord (需要翻墙)',
      submenu: [
        {
          label: 'The Forbidden Trove',
          click: () => { shell.openExternal('https://discord.gg/KNpmhvk') }
        },
        {
          label: 'r/pathofexile',
          click: () => { shell.openExternal('https://discord.gg/fSwfqN5') }
        }
      ]
    },
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ])

  tray.setContextMenu(contextMenu)
}
