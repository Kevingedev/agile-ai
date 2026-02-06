# Historia de Usuario US-002

## Ver detalle de una fruta
**Como** usuario
**Quiero** hacer click en una card de fruta
**Para** ver todos sus detalles en una página nueva

## Criterios de Aceptación

### Escenario 1: Navegación al detalle
**Dado** que el usuario está viendo el catálogo de frutas
**Cuando** hace click en una card de fruta
**Entonces** se abre una página nueva con los detalles de esa fruta

### Escenario 2: Visualización de detalles completos
**Dado** que el usuario está en la página de detalle
**Cuando** observa la información
**Entonces** puede ver el nombre, precio e imagen de la fruta seleccionada

### Escenario 3: Volver al catálogo
**Dado** que el usuario está en la página de detalle
**Cuando** quiere volver al catálogo
**Entonces** puede navegar de vuelta a la lista de frutas

## Notas
- Depende de US-001 (catálogo de frutas)
- La página de detalle recibe el id de la fruta como parámetro

## Tareas
| Código | Nombre |
|--------|--------|
| TK-002-01 | Hacer que el componente cardFruta redireccione a la vista de detalle  |
| TK-002-02 | Pasar id del item seleccionado por URL |
| TK-002-03 | Crear vista de detalle de fruta |
| TK-002-04 | Obtener el id de la URL para conecta con los datos de la API |
| TK-002-05 | Renderizar dinamicamente detalles de la fruta seleccionada |
| TK-002-06 | Crear breadcrumb en la pagina de detalle para volver al catalogo |


### Detalles
- Estilo Glassmorphism
- Moderno y Minimalista
- Responsive
- Color tono principal Verde