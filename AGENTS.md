# Repository Agents & Skills Guide (`AGENTS.md`)

Este archivo documenta las habilidades (skills) disponibles y las reglas de activación para los agentes de IA en este proyecto.

## Available Skills

| Skill | Path | Description |
|---|---|---|
| `react-rules` | `.agents/skills/react-rules/SKILL.md` | Estándares de desarrollo y reglas de arquitectura para proyectos y componentes de React con TypeScript, Tailwind CSS, Zustand, Zod, React Hook Form y React Query / SWR. |
| `skill-creator` | `.agents/skills/skill-creator/SKILL.md` | Habilidad para la creación, optimización, testing e iteración de habilidades (skills). |

---

## Skill Trigger Rules

### `react-rules`
- **Activación**: Activar esta habilidad cuando el usuario pida:
  - Crear una nueva aplicación React o generar su estructura con TypeScript.
  - Crear, agregar o modificar componentes de React y maquetación con Tailwind CSS.
  - Diseñar e implementar Custom Hooks (`useAuth`, `useFetch`, etc.).
  - Gestionar estado global utilizando Zustand (`create()`).
  - Crear esquemas de validación de datos utilizando Zod (`z.object`, `z.string`, `parse`, `safeParse`).
  - Implementar formularios utilizando React Hook Form con resolver de Zod.
  - Implementar lógica de UI o fetching de APIs utilizando TanStack Query (React Query) o SWR.
  - Refactorizar código React para cumplir con principios de inmutabilidad, pureza y correcto uso de `useEffect`.

### `skill-creator`
- **Activación**: Activar cuando el usuario pida crear una nueva habilidad (skill) desde cero, modificar o mejorar habilidades existentes, o evaluar/benchmarkear su rendimiento.
