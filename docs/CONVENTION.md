# 📜 Conventions de Commits - PokeBaston

Pour maintenir un historique clair et professionnel au sein de notre équipe de 5 étudiants, nous utilisons la convention suivante :

`[emoji] [type]: [description en minuscule]`

---

## 🚀 Types de Commits Principaux

| Emoji | Type | Usage | Exemple (Anglais) |
| :--- | :--- | :--- | :--- |
| ✨ | **feat** | Ajout d'une nouvelle fonctionnalité | `✨ feat: add type advantage logic` |
| 🐛 | **fix** | Correction d'un bug | `🐛 fix: resolve HP calculation glitch` |
| 📝 | **docs** | Modification de la documentation | `📝 docs: update project readme` |
| 🎨 | **style** | UI, CSS, et changements de formatage | `🎨 style: adjust battle arena layout` |
| ⚡ | **perf** | Amélioration des performances | `⚡ perf: optimize sprite loading time` |
| ♻️ | **refactor** | Modification du code sans changer le comportement | `♻️ refactor: clean up battle loop logic` |
| 🧪 | **test** | Ajout ou correction de tests | `🧪 test: add unit test for physical moves` |
| 🔧 | **chore** | Maintenance, configuration, outils (npm, git) | `🔧 chore: install axios dependency` |
| ⏪ | **revert** | Annulation d'un commit précédent | `⏪ revert: undo last broken feature` |

---

## 💡 Bonnes Pratiques

1. **Brièveté** : La description doit être courte et explicite.
2. **Mode Impératif** : En anglais, utilisez "add" au lieu de "added", "fix" au lieu de "fixed".
3. **Atomicité** : Un commit ne doit idéalement traiter qu'un seul sujet à la fois.
4. **Formatage** : Toujours inclure un espace après les `:` pour la lisibilité.

> **Exemple Parfait :**
> `✨ feat: introducing battle feature`