/**
 * TP 27.18 — Sauvegarde locale de English Learning AI.
 * Aucun réseau, aucune authentification : seul localStorage de cette application
 * est exporté. Les données d'autres sites / outils ne sont jamais touchées.
 */

export const APP_STORAGE_PREFIX = 'english-learning-'
const APP_ID = 'english-learning-ai'
const FORMAT_VERSION = 1
export const MAX_BACKUP_FILE_BYTES = 5 * 1024 * 1024
const MAX_ENTRIES = 200
const MAX_VALUE_LENGTH = 2 * 1024 * 1024
const MAX_TOTAL_VALUE_LENGTH = 4 * 1024 * 1024

export type ProgressBackup = {
  app: typeof APP_ID
  version: typeof FORMAT_VERSION
  exportedAt: string
  entries: Record<string, string>
}

export type BackupComparison = {
  present: number
  imported: number
  replaced: number
  removed: number
  added: number
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Les clés locales sont filtrées, et les noms typiques de secrets exclus. */
export function isProgressKey(key: string): boolean {
  return (
    /^english-learning-[a-z0-9][a-z0-9._-]*$/.test(key) &&
    key.length <= 120 &&
    !/(password|passwd|token|secret|session|oauth|credential|api[-_]?key|auth)/i.test(key)
  )
}

/** Lit l'état actuel, y compris les clés des TP ajoutés ultérieurement. */
export function readCurrentProgress(): Record<string, string> {
  const result: Record<string, string> = Object.create(null) as Record<string, string>
  const storage = window.localStorage
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    if (key && isProgressKey(key)) {
      const value = storage.getItem(key)
      if (value !== null) result[key] = value
    }
  }
  return result
}

/** Prend une photo instantanée des données et la valide avant l'export. */
export function createProgressBackup(): ProgressBackup {
  const entries = readCurrentProgress()
  if (Object.keys(entries).length === 0) {
    throw new Error('Aucune progression locale à sauvegarder pour le moment.')
  }
  const exportedAt = new Date().toISOString()
  // Validation identique à celle de l'import pour détecter des volumes trop grands.
  return validateProgressBackup({ app: APP_ID, version: FORMAT_VERSION, exportedAt, entries })
}

/** Valide un fichier non fiable AVANT tout changement de localStorage. */
export function validateProgressBackup(value: unknown): ProgressBackup {
  if (!isRecord(value) ||
      value.app !== APP_ID ||
      value.version !== FORMAT_VERSION ||
      typeof value.exportedAt !== 'string' ||
      !Number.isFinite(Date.parse(value.exportedAt)) ||
      !isRecord(value.entries)) {
    throw new Error('Fichier invalide : ce n’est pas une sauvegarde English Learning AI v1.')
  }

  const source = value.entries
  const keys = Object.keys(source)
  if (keys.length === 0) {
    throw new Error('Sauvegarde vide : aucune progression à restaurer.')
  }
  if (keys.length > MAX_ENTRIES) {
    throw new Error('Sauvegarde trop volumineuse : trop de clés de stockage.')
  }

  let totalLength = 0
  const entries: Record<string, string> = Object.create(null) as Record<string, string>
  for (const key of keys) {
    const item = source[key]
    if (!isProgressKey(key) || typeof item !== 'string') {
      throw new Error(`Donnée non autorisée dans la sauvegarde : ${key}`)
    }
    if (item.length > MAX_VALUE_LENGTH) {
      throw new Error(`Donnée trop volumineuse : ${key}`)
    }
    totalLength += item.length
    if (totalLength > MAX_TOTAL_VALUE_LENGTH) {
      throw new Error('Sauvegarde trop volumineuse pour le stockage local.')
    }
    entries[key] = item
  }

  return {
    app: APP_ID,
    version: FORMAT_VERSION,
    exportedAt: value.exportedAt,
    entries,
  }
}

/** Limite d'upload : 5 Mo, avec vérification de la structure JSON. */
export function parseProgressBackup(content: string): ProgressBackup {
  if (new Blob([content]).size > MAX_BACKUP_FILE_BYTES) {
    throw new Error('Fichier trop volumineux (maximum 5 Mo).')
  }
  let decoded: unknown
  try {
    decoded = JSON.parse(content) as unknown
  } catch {
    throw new Error('Le fichier sélectionné ne contient pas de JSON valide.')
  }
  return validateProgressBackup(decoded)
}

export function compareProgressBackup(backup: ProgressBackup): BackupComparison {
  const currentKeys = new Set(Object.keys(readCurrentProgress()))
  const importedKeys = Object.keys(backup.entries)
  const importedSet = new Set(importedKeys)
  return {
    present: currentKeys.size,
    imported: importedKeys.length,
    replaced: importedKeys.filter(key => currentKeys.has(key)).length,
    removed: [...currentKeys].filter(key => !importedSet.has(key)).length,
    added: importedKeys.filter(key => !currentKeys.has(key)).length,
  }
}

/** Téléchargement réel d'un JSON, conservé par l'utilisateur. */
export function downloadProgressBackup(): { filename: string; entryCount: number } {
  const backup = createProgressBackup()
  const date = backup.exportedAt.slice(0, 19).replace(/[:T]/g, '-')
  const filename = `english-learning-ai-sauvegarde-${date}.json`
  const text = JSON.stringify(backup, null, 2)
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' })
  if (blob.size > MAX_BACKUP_FILE_BYTES) {
    throw new Error('Sauvegarde trop volumineuse pour le format JSON (maximum 5 Mo).')
  }
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  return { filename, entryCount: Object.keys(backup.entries).length }
}

/**
 * Remplace uniquement les clés de progression de cette application.
 * En cas d'erreur synchrone, tente de rétablir l'ancien état.
 * Après succès, la page doit être rechargée : les hooks React gardent
 * des instantanés en mémoire qui ne sont pas mis à jour dans le même onglet.
 */
export function restoreProgressBackup(backup: ProgressBackup): number {
  const checked = validateProgressBackup(backup)
  const previous = readCurrentProgress()
  const storage = window.localStorage

  try {
    for (const key of Object.keys(previous)) {
      if (!(key in checked.entries)) storage.removeItem(key)
    }
    for (const [key, value] of Object.entries(checked.entries)) {
      storage.setItem(key, value)
    }
  } catch {
    try {
      // Retour vers l'état antérieur si un setItem échoue (quota / accès).
      for (const key of Object.keys(readCurrentProgress())) storage.removeItem(key)
      for (const [key, value] of Object.entries(previous)) storage.setItem(key, value)
    } catch {
      throw new Error('Restauration interrompue et retour arrière incomplet. Utilise une sauvegarde JSON avant de recommencer.')
    }
    throw new Error('Restauration impossible : stockage local indisponible ou saturé. Anciennes données rétablies.')
  }
  return Object.keys(checked.entries).length
}
