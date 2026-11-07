/** Contrôle local ciblé : ne remplace pas un audit de dépendances npm. */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const paths = []
function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) walk(file)
    else if (/\.(ts|tsx|js|jsx|json|html)$/.test(entry.name)) paths.push(file)
  }
}
walk('src')

const problems = []
for (const file of paths) {
  const content = readFileSync(file, 'utf8')
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(content)) problems.push(`${file} : clé privée trouvée`)
  if (/dangerouslySetInnerHTML\s*=/.test(content)) problems.push(`${file} : HTML brut à examiner`)
  if (/(?:sk_live_|ghp_|AKIA)[A-Za-z0-9]{16,}/.test(content)) problems.push(`${file} : clé potentiellement présente`)
}
if (existsSync('.env') || existsSync('.env.production')) {
  problems.push('Un fichier .env est présent : vérifie qu’il n’est jamais publié ou partagé.')
}
for (const file of ['public/_headers', 'public/_redirects', 'public/robots.txt']) {
  if (!existsSync(file)) problems.push(`Fichier de déploiement manquant : ${file}`)
}
if (problems.length) {
  for (const issue of problems) console.error('✗', issue)
  process.exitCode = 1
} else {
  console.log(`✓ ${paths.length} fichiers source contrôlés : aucun indicateur bloquant détecté.`)
  console.log('Ce contrôle ne remplace pas npm audit, une revue de code ou un test en navigateur.')
}
