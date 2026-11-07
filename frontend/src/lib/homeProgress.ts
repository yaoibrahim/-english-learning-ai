/** Résumé léger des parcours, sans importer les milliers de lignes de questions. */
export type HomePathProgress = { cefrCount: number; coursesCount: number }
export const HOME_CEFR_TOTAL = 18
export const HOME_COURSES_TOTAL = 35

type StorageReader = Pick<Storage, 'getItem'>

function readCount(storage: StorageReader, key: string, maximum: number): number {
  try {
    const json: unknown = JSON.parse(storage.getItem(key) || 'null')
    if (!json || typeof json !== 'object' || Array.isArray(json)) return 0
    const ids = (json as { completedIds?: unknown }).completedIds
    if (!Array.isArray(ids)) return 0
    return Math.min(maximum, new Set(ids.filter((id): id is string => typeof id === 'string' && id.length <= 80)).size)
  } catch { return 0 }
}

export function readHomePathProgress(storage: StorageReader): HomePathProgress {
  return {
    cefrCount: readCount(storage, 'english-learning-cefr-v1', HOME_CEFR_TOTAL),
    coursesCount: readCount(storage, 'english-learning-courses-v1', HOME_COURSES_TOTAL),
  }
}
