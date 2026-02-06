# Descripción funcional del proyecto

## Resumen
Este proyecto implementa un catálogo de frutas con navegación a un detalle por fruta. La aplicación permite visualizar una lista de frutas, acceder a una página de detalle con información completa (nombre, precio e imagen) y volver al catálogo. El flujo principal es:
1. El usuario abre el catálogo.
2. Selecciona una fruta desde una card.
3. Se navega a la vista de detalle con el `id` en la URL.
4. Se muestran datos de la fruta seleccionada.
5. El usuario vuelve al catálogo mediante un breadcrumb.

## Funcionalidades principales
- **Catálogo de frutas** con cards de cada ítem.
- **Detalle de fruta** con datos completos e imagen.
- **Navegación** de ida (card → detalle) y vuelta (breadcrumb → catálogo).
- **UI moderna** con estilo Glassmorphism, minimalista, responsive y con tono principal verde.

## Participación del usuario y de OpenCode en el desarrollo de tareas
El diseño de las tareas se realizó con una participación activa del usuario, quien definió el alcance, priorizó actividades y validó la descomposición técnica. OpenCode se integró como apoyo para estructurar, refinar y documentar el trabajo en el marco de las historias de usuario.

### 1) Análisis y descomposición de historias de usuario
El usuario lidera la lectura de la historia de usuario, define el alcance funcional y decide el nivel de detalle de cada tarea. OpenCode apoya con la identificación de criterios de aceptación y propone ajustes para mantener la trazabilidad. Ejemplo sobre US-002 (detalle de fruta):
- **Identificación de dependencias**: el usuario establece la dependencia con US-001 (catálogo) y OpenCode ayuda a explicitar su impacto.
- **Desglose de tareas**: el usuario define tareas como redirección desde card, paso de `id` por URL, creación de vista detalle, consumo de API, render dinámico y breadcrumb de retorno; OpenCode sugiere el orden técnico y revisa consistencia.

### 2) Definición de flujo de navegación y contratos
El usuario decide el flujo de navegación y valida los contratos de datos. OpenCode participa detallando los puntos técnicos:
- Define el **formato de ruta** para el detalle (por ejemplo, `fruit-detail.html?id=XX`).
- Establece el **parámetro de URL** requerido (`id`) y su validación.
- Describe la **respuesta esperada** del servicio para renderizar detalles.

### 3) Implementación guiada por tareas (task-by-task)
El usuario asigna y prioriza las tareas a ejecutar, mientras OpenCode aporta propuestas de implementación y verificación técnica:

**TK-002-01 – Redirección desde la card**
- Ajusta el componente `cardFruta` para navegar al detalle cuando se hace click.
- Garantiza que la interacción sea accesible (click en toda la card o botón).

**TK-002-02 – Paso del id por URL**
- Configura el enlace para incluir el `id` del ítem seleccionado.
- Verifica que el `id` sea consistente con el catálogo y la API.

**TK-002-03 – Vista de detalle**
- Crea el layout de detalle en una nueva página.
- Mantiene consistencia visual (Glassmorphism, verde principal).

**TK-002-04 – Lectura del id desde URL**
- Implementa la lectura de parámetros con `URLSearchParams`.
- Maneja estados de error si el `id` es inválido o falta.

**TK-002-05 – Render dinámico**
- Obtiene datos desde la API usando el `id`.
- Renderiza nombre, precio e imagen en el detalle.

**TK-002-06 – Breadcrumb de retorno**
- Incorpora un breadcrumb que redirige al catálogo.
- Garantiza navegación intuitiva y consistente.

### 4) Validación contra criterios de aceptación
El usuario valida el cumplimiento funcional y OpenCode apoya la verificación técnica:
- **Navegación al detalle**: click en card abre la nueva vista.
- **Detalle completo**: se muestran nombre, precio e imagen.
- **Volver al catálogo**: breadcrumb funcional.

### 5) Estilo y experiencia de usuario
El usuario define la intención visual y OpenCode ayuda a trasladarla a la implementación:
- Glassmorphism, moderno y minimalista.
- Diseño responsive.
- Paleta con tono principal verde.

### 6) Documentación y trazabilidad
El usuario revisa y valida la documentación; OpenCode redacta decisiones técnicas y vincula cada cambio con la tarea correspondiente, facilitando:
- Trazabilidad con el backlog.
- Revisión y mantenimiento.
- Consistencia entre historias de usuario y código.

## Resultado esperado
Con la participación activa del usuario en el diseño de tareas y el soporte de OpenCode, la funcionalidad de detalle de fruta se implementa de forma ordenada, trazable y alineada a criterios de aceptación, garantizando una experiencia consistente entre catálogo y detalle, con navegación clara y UI moderna.