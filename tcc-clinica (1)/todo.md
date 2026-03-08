# TCC Clínica Profesional — TODO

## FASE 1: Arquitectura de Seguridad y Modelos de Datos

### Autenticación y Seguridad
- [ ] Sistema de login/registro con validación de credenciales
- [ ] Encriptación de contraseñas (bcrypt)
- [ ] Tokens JWT para sesiones seguras
- [ ] Recuperación de contraseña por correo
- [ ] Verificación de email de terapeuta
- [ ] Protección de rutas (middleware de autenticación)
- [ ] Cumplimiento HIPAA/GDPR en almacenamiento de datos

### Base de Datos y Modelos
- [ ] Configurar PostgreSQL con Drizzle ORM
- [ ] Esquema de usuarios (terapeutas)
- [ ] Esquema de pacientes con encriptación de PII
- [ ] Esquema de entrevistas iniciales
- [ ] Esquema de diagnósticos presuntivos
- [ ] Esquema de planes de intervención
- [ ] Esquema de sesiones y seguimiento
- [ ] Esquema de escalas de evaluación
- [ ] Índices y optimizaciones de BD

### API REST Segura
- [ ] Endpoints de autenticación
- [ ] Endpoints CRUD de pacientes
- [ ] Endpoints de entrevistas
- [ ] Endpoints de diagnósticos
- [ ] Endpoints de planes de intervención
- [ ] Endpoints de sesiones
- [ ] Rate limiting y validación de entrada
- [ ] Logging de acciones clínicas

## FASE 2: Módulo de Entrevista Inicial

### Formulario Dinámico
- [ ] Secciones expandibles (Motivo de consulta, Antecedentes, Examen mental)
- [ ] Validación en tiempo real
- [ ] Guardado automático de borradores
- [ ] Historial de cambios

### Análisis Funcional (ABC)
- [ ] Formulario para Antecedentes (situación disparadora)
- [ ] Registro de Conducta (respuesta observable)
- [ ] Registro de Consecuencias (reforzadores/castigos)
- [ ] Matriz visual ABC
- [ ] Análisis de patrones conductuales

### Examen Mental
- [ ] Apariencia y comportamiento
- [ ] Lenguaje y velocidad del habla
- [ ] Afecto y humor
- [ ] Procesos de pensamiento
- [ ] Contenido del pensamiento (ideación suicida/homicida)
- [ ] Orientación y memoria
- [ ] Insight y juicio

### Almacenamiento Seguro
- [ ] Encriptación de datos sensibles
- [ ] Auditoría de acceso
- [ ] Backup automático

## FASE 3: Motor de Diagnóstico con IA

### Base de Datos DSM-5-TR/CIE-11
- [ ] Importar criterios diagnósticos DSM-5-TR
- [ ] Importar criterios CIE-11
- [ ] Estructura de criterios (obligatorios, opcionales, duración)
- [ ] Diagnósticos diferenciales

### Motor de Sugerencias
- [ ] Análisis de síntomas reportados
- [ ] Búsqueda de coincidencias con criterios DSM-5-TR
- [ ] Cálculo de probabilidad de diagnóstico
- [ ] Generación de justificación clínica
- [ ] Listado de diagnósticos presuntivos ordenados

### Integración de IA
- [ ] Llamadas a API de IA para análisis contextual
- [ ] Generación de explicaciones clínicas
- [ ] Sugerencias de diagnósticos diferenciales

### Avisos Legales
- [ ] Disclaimer: "Solo apoyo al criterio del psicólogo colegiado"
- [ ] Indicación de que requiere validación profesional
- [ ] Responsabilidad del terapeuta

## FASE 4: Generador de Planes de Intervención TCC

### Estructura de Planes
- [ ] Duración estimada del tratamiento
- [ ] Número de sesiones recomendadas
- [ ] Objetivos terapéuticos generales
- [ ] Objetivos por sesión

### Módulos TCC por Sesión
- [ ] Psicoeducación (sesiones 1-2)
- [ ] Reestructuración cognitiva (sesiones 3-6)
- [ ] Técnicas de exposición (sesiones 7-10)
- [ ] Activación conductual (sesiones 3-8)
- [ ] Prevención de recaídas (última sesión)

### Tareas para Casa
- [ ] Generación automática de tareas
- [ ] Registro de cumplimiento
- [ ] Seguimiento de dificultades

### Personalización
- [ ] Adaptación según diagnóstico
- [ ] Ajuste según comorbilidades
- [ ] Modificación manual por terapeuta

## FASE 5: Panel de Seguimiento

### Registro de Sesiones
- [ ] Fecha y duración
- [ ] Temas tratados
- [ ] Técnicas aplicadas
- [ ] Tareas asignadas
- [ ] Notas clínicas
- [ ] Evaluación de progreso

### Escalas de Evaluación
- [ ] PHQ-9 (depresión)
- [ ] GAD-7 (ansiedad)
- [ ] BDI-II (depresión profunda)
- [ ] BAI (ansiedad específica)
- [ ] DASS-21 (depresión, ansiedad, estrés)
- [ ] Aplicación periódica (sesión 1, 5, 10, final)

### Gráficas de Evolución
- [ ] Gráfica de puntuaciones en escalas
- [ ] Línea de tendencia
- [ ] Comparación pre-post
- [ ] Indicadores de mejoría
- [ ] Alertas de deterioro

### Reportes
- [ ] Resumen de progreso
- [ ] Exportación PDF
- [ ] Gráficas imprimibles

## FASE 6: Interfaz Profesional y Seguridad

### Autenticación
- [ ] Pantalla de login profesional
- [ ] Validación de credenciales
- [ ] Recuperación de contraseña
- [ ] Cierre de sesión seguro

### Dashboard Clínico
- [ ] Resumen de pacientes activos
- [ ] Alertas de riesgo
- [ ] Próximas sesiones
- [ ] Pacientes que requieren seguimiento

### Navegación Segura
- [ ] Protección de rutas
- [ ] Redirección a login si no autenticado
- [ ] Cierre de sesión por inactividad
- [ ] Bloqueo de pantalla

### Diseño Profesional
- [ ] Paleta azul médico + blanco
- [ ] Tipografía clara y legible
- [ ] Iconografía médica
- [ ] Espaciado profesional
- [ ] Modo oscuro opcional

### Privacidad de Datos
- [ ] Enmascaramiento de PII en listas
- [ ] Acceso restringido a historiales
- [ ] Auditoría de acceso
- [ ] Opción de exportar datos del paciente

## FASE 7: Pruebas y Entrega

### Pruebas Funcionales
- [ ] Flujo completo de entrevista
- [ ] Generación de diagnósticos
- [ ] Creación de planes
- [ ] Seguimiento de sesiones
- [ ] Gráficas de evolución

### Pruebas de Seguridad
- [ ] Validación de autenticación
- [ ] Protección contra inyección SQL
- [ ] Encriptación de datos
- [ ] Pruebas de acceso no autorizado

### Documentación
- [ ] Manual de usuario
- [ ] Guía de uso del motor de diagnóstico
- [ ] Términos de servicio y privacidad
- [ ] Avisos legales

### Entrega
- [ ] Generación de APK
- [ ] Publicación en app store
- [ ] Soporte inicial
