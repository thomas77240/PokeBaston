# 📜 Conventions de Commits - PokeBaston

Pour maintenir un historique clair et professionnel au sein de notre équipe de 5 étudiants, nous utilisons la convention suivante :

`[emoji] [type]: [description en minuscule]`

---

## 🚀 Types de Commits Principaux

| Emoji | Shortcode | Syntaxe | Type | Usage | Exemple |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ✨ | `:sparkles:` | **feat** | Fonctionnalité | Ajout d'une nouveauté | `✨ feat: add type advantage logic` |
| 🐛 | `:bug:` | **fix** | Bug | Correction d'un problème | `🐛 fix: resolve HP calculation glitch` |
| 📝 | `:memo:` | **docs** | Documentation | Modification de la doc | `📝 docs: update project readme` |
| 🎨 | `:art:` | **style** | Style | UI, CSS, formatage | `🎨 style: adjust battle arena layout` |
| ⚡ | `:zap:` | **perf** | Performance | Amélioration de la rapidité | `⚡ perf: optimize sprite loading time` |
| ♻️ | `:recycle:` | **refactor** | Refacto | Code plus propre | `♻️ refactor: clean up battle loop logic` |
| 🧪 | `:test_tube:` | **test** | Test | Ajout/Correction de tests | `🧪 test: add unit test for physical moves` |
| 🔧 | `:wrench:` | **chore** | Maintenance | Config, outils, dépendances | `🔧 chore: install axios dependency` |
| ⏪ | `:rewind:` | **revert** | Revert | Annulation d'un commit | `⏪ revert: undo last broken feature` |
| 🧱 | `:bricks:` | **arch** | Architecture | Structure du projet | `🧱 arch: initializing pokebaston project` |

---

## 💡 Bonnes Pratiques

1. **Brièveté** : La description doit être courte et explicite.
2. **Mode Impératif** : En anglais, utilisez "add" au lieu de "added", "fix" au lieu de "fixed".
3. **Atomicité** : Un commit ne doit idéalement traiter qu'un seul sujet à la fois.
4. **Formatage** : Toujours inclure un espace après les `:` pour la lisibilité.

> **Exemple Parfait :**
> `✨ feat: introducing battle feature`