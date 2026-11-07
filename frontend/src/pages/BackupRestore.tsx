import { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  APP_STORAGE_PREFIX,
  MAX_BACKUP_FILE_BYTES,
  compareProgressBackup,
  downloadProgressBackup,
  parseProgressBackup,
  readCurrentProgress,
  restoreProgressBackup,
  type ProgressBackup,
} from '../lib/progressBackup'

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : 'Une erreur inattendue est survenue.'
}

export default function BackupRestore() {
  const [backup, setBackup] = useState<ProgressBackup | null>(null)
  const [fileName, setFileName] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [notice, setNotice] = useState('')
  const [problem, setProblem] = useState('')
  const [currentKeys] = useState(() => {
    try { return Object.keys(readCurrentProgress()) }
    catch { return [] as string[] }
  })

  const comparison = backup ? (() => {
    try { return compareProgressBackup(backup) }
    catch { return null }
  })() : null

  function exportBackup() {
    setProblem('')
    setNotice('')
    try {
      const result = downloadProgressBackup()
      setNotice(`Téléchargement lancé : ${result.filename} (${result.entryCount} données). Vérifie ton dossier Téléchargements.`)
    } catch (error) {
      setProblem(describeError(error))
    }
  }

  async function selectBackup(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = '' // permet de sélectionner de nouveau le même fichier
    setBackup(null)
    setFileName('')
    setConfirmed(false)
    setProblem('')
    setNotice('')
    if (!file) return

    if (file.size > MAX_BACKUP_FILE_BYTES) {
      setProblem('Ce fichier dépasse la limite autorisée de 5 Mo.')
      return
    }

    try {
      const text = await file.text()
      const parsed = parseProgressBackup(text)
      setBackup(parsed)
      setFileName(file.name)
    } catch (error) {
      setProblem(describeError(error))
    }
  }

  function restoreBackup() {
    if (!backup || !confirmed) return
    setProblem('')
    try {
      restoreProgressBackup(backup)
      // Nécessaire pour recharger les snapshots React (useSyncExternalStore).
      window.location.reload()
    } catch (error) {
      setProblem(describeError(error))
    }
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-block rounded-xl bg-slate-200 px-4 py-2 font-medium hover:bg-slate-300"
      >
        ← Accueil
      </Link>

      <header className="rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 p-7 text-white">
        <p className="font-semibold text-sky-100">TP 27.18 · Données locales</p>
        <h1 className="mt-2 text-3xl font-bold">💾 Sauvegarde et restauration</h1>
        <p className="mt-3 text-sky-100">
          Conserve tes XP, ta progression et tes révisions dans un fichier JSON.
          Sans compte, sans serveur, sans abonnement.
        </p>
      </header>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">1. Sauvegarder ma progression</h2>
        <p className="text-slate-600">
          {currentKeys.length} donnée(s) locale(s) trouvée(s) pour cette application.
          Seules les clés commençant par <code className="rounded bg-slate-100 px-1">{APP_STORAGE_PREFIX}</code>
          {' '}sont incluses (hors clés pouvant contenir des identifiants).
        </p>
        {currentKeys.length > 0 && (
          <details className="rounded-lg bg-slate-50 p-3">
            <summary className="cursor-pointer font-medium">Voir les données incluses</summary>
            <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
              {currentKeys.map(key => <li key={key}><code>{key}</code></li>)}
            </ul>
          </details>
        )}
        <button
          type="button"
          onClick={exportBackup}
          className="rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white hover:bg-sky-700"
        >
          ⬇️ Télécharger ma sauvegarde JSON
        </button>
        <p className="text-sm text-slate-500">
          Stocke ce fichier dans un endroit sûr, par exemple sur une clé USB.
          Le navigateur ne crée pas de sauvegarde automatique.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">2. Restaurer une sauvegarde</h2>
        <p className="text-slate-600">
          Choisis un fichier JSON exporté par English Learning AI.
          Le contenu sera contrôlé avant toute modification de ta progression.
        </p>
        <label htmlFor="backup-file" className="block font-semibold text-slate-800">
          Fichier de sauvegarde (.json)
        </label>
        <input
          id="backup-file"
          type="file"
          accept=".json,application/json"
          onChange={event => void selectBackup(event)}
          className="block w-full rounded-xl border border-slate-300 p-3 text-sm"
        />

        {backup && comparison && (
          <div className="space-y-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <h3 className="font-bold text-indigo-900">Aperçu de la restauration</h3>
            <p className="break-words text-sm"><strong>Fichier :</strong> {fileName}</p>
            <p className="text-sm"><strong>Exporté le :</strong> {new Date(backup.exportedAt).toLocaleString('fr-FR')}</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
              <li>{comparison.imported} données à restaurer</li>
              <li>{comparison.replaced} données existantes à remplacer</li>
              <li>{comparison.added} nouvelles données à ajouter</li>
              <li>{comparison.removed} anciennes données de l'application à retirer</li>
            </ul>
            <p className="text-sm font-medium text-amber-900">
              ⚠️ La restauration remplace la progression locale actuelle par celle du fichier.
              Télécharge une sauvegarde de ta progression actuelle avant de continuer.
            </p>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3 text-sm">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={event => setConfirmed(event.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>Je comprends que la progression actuelle sera remplacée et j'ai conservé une copie si nécessaire.</span>
            </label>
            <button
              type="button"
              disabled={!confirmed}
              onClick={restoreBackup}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ♻️ Restaurer et recharger l'application
            </button>
          </div>
        )}
      </section>

      {notice && <p role="status" className="rounded-xl bg-green-50 p-4 text-green-800">✅ {notice}</p>}
      {problem && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">❌ {problem}</p>}

      <p className="text-sm text-slate-500">
        ℹ️ Les données restent sur cet appareil et dans ton navigateur.
        Changer de navigateur, effacer les données du site ou utiliser le mode privé peut les faire disparaître.
        Une sauvegarde JSON permet de les récupérer manuellement.
      </p>
    </div>
  )
}
