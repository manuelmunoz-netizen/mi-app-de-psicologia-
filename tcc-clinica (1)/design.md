# TCC Clínica — Diseño de Interfaz Móvil

## Concepto General

Aplicación de apoyo al psicólogo clínico para diagnóstico e intervención en Terapia Cognitivo-Conductual (TCC). Orientada al profesional de salud mental, permite gestionar pacientes, aplicar escalas diagnósticas, registrar pensamientos automáticos, planificar intervenciones y monitorear el progreso terapéutico.

---

## Paleta de Colores

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `primary` | `#3B82F6` (azul clínico) | `#60A5FA` | Acciones principales, énfasis |
| `background` | `#F8FAFC` | `#0F172A` | Fondo de pantallas |
| `surface` | `#FFFFFF` | `#1E293B` | Tarjetas, modales |
| `foreground` | `#1E293B` | `#F1F5F9` | Texto principal |
| `muted` | `#64748B` | `#94A3B8` | Texto secundario |
| `border` | `#E2E8F0` | `#334155` | Bordes y divisores |
| `success` | `#10B981` | `#34D399` | Progreso positivo |
| `warning` | `#F59E0B` | `#FBBF24` | Alertas moderadas |
| `error` | `#EF4444` | `#F87171` | Alertas críticas, riesgo |
| `accent` | `#8B5CF6` | `#A78BFA` | Técnicas TCC, psicoeducación |

---

## Lista de Pantallas

### Onboarding / Auth
1. **Splash / Bienvenida** — Logo, nombre de la app, botón de inicio
2. **Perfil del Terapeuta** — Nombre, especialidad, configuración inicial

### Navegación Principal (Tab Bar)
- **Inicio (Dashboard)** — Resumen del día, pacientes recientes, alertas
- **Pacientes** — Lista de pacientes con búsqueda y filtros
- **Herramientas TCC** — Técnicas y recursos de intervención
- **Progreso** — Gráficas de seguimiento y evolución
- **Ajustes** — Configuración de la app

### Módulo de Pacientes
5. **Lista de Pacientes** — Cards con nombre, diagnóstico, última sesión
6. **Perfil del Paciente** — Datos clínicos, historial, diagnóstico DSM-5
7. **Nueva Sesión** — Registro de sesión terapéutica
8. **Historial de Sesiones** — Timeline de sesiones anteriores

### Módulo Diagnóstico
9. **Escalas de Evaluación** — Lista de instrumentos (PHQ-9, GAD-7, BDI-II, etc.)
10. **Aplicar Escala** — Formulario de evaluación paso a paso
11. **Resultados de Escala** — Puntuación, interpretación, recomendaciones
12. **Formulación de Caso** — Modelo cognitivo del paciente

### Módulo de Intervención TCC
13. **Registro de Pensamientos** — Diario ABC (Activador, Creencia, Consecuencia)
14. **Reestructuración Cognitiva** — Identificación y cuestionamiento de distorsiones
15. **Experimentos Conductuales** — Planificación y registro
16. **Activación Conductual** — Agenda de actividades y registro de humor
17. **Técnicas de Relajación** — Respiración diafragmática, relajación muscular progresiva
18. **Exposición Gradual** — Jerarquía de miedos y registro de exposición

### Módulo de Psicoeducación
19. **Biblioteca de Recursos** — Artículos, fichas psicoeducativas
20. **Modelo Cognitivo** — Explicación interactiva del modelo ABC
21. **Distorsiones Cognitivas** — Catálogo con ejemplos y ejercicios

### Módulo de Progreso
22. **Dashboard de Progreso** — Gráficas de escalas a lo largo del tiempo
23. **Registro de Humor** — Calendario de estados emocionales
24. **Informe de Sesión** — Resumen exportable

---

## Flujos de Usuario Principales

### Flujo 1: Evaluación Diagnóstica
```
Pacientes → Perfil del Paciente → Escalas de Evaluación
→ Seleccionar PHQ-9 → Aplicar ítem por ítem → Ver Resultado
→ Guardar en historial del paciente
```

### Flujo 2: Registro de Pensamiento Automático
```
Dashboard → Herramientas TCC → Registro de Pensamientos
→ Nueva entrada → Situación → Emoción → Pensamiento Automático
→ Evidencia a favor / en contra → Pensamiento alternativo → Guardar
```

### Flujo 3: Nueva Sesión
```
Pacientes → Seleccionar Paciente → Nueva Sesión
→ Objetivos de sesión → Técnicas aplicadas → Tareas para casa
→ Notas clínicas → Guardar sesión
```

### Flujo 4: Seguimiento de Progreso
```
Progreso → Seleccionar Paciente → Ver gráfica de PHQ-9
→ Comparar sesiones → Exportar informe
```

---

## Componentes de Diseño

### Tab Bar (5 tabs)
- Inicio (house.fill)
- Pacientes (person.2.fill)
- Herramientas (brain.head.profile)
- Progreso (chart.line.uptrend.xyaxis)
- Ajustes (gearshape.fill)

### Cards de Paciente
- Avatar con iniciales, nombre completo
- Diagnóstico principal (DSM-5)
- Indicador de riesgo (verde/amarillo/rojo)
- Fecha de última sesión

### Cards de Escala
- Nombre del instrumento
- Número de ítems
- Tiempo estimado
- Última aplicación

### Gráficas de Progreso
- Línea temporal de puntuaciones
- Barras de comparación entre sesiones
- Indicadores de corte clínico

---

## Principios de Diseño

- **Claridad clínica**: Información precisa, terminología DSM-5/TCC correcta
- **Eficiencia**: Flujos cortos, máximo 3 taps para acciones frecuentes
- **Seguridad**: Datos sensibles, diseño que transmite confianza
- **Accesibilidad**: Fuentes legibles, contraste alto, soporte dark mode
- **Una mano**: Acciones principales en la mitad inferior de la pantalla
