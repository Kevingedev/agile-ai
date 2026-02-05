class SimpleRouter {
  constructor() {
    this.routes = new Map();
    this.appContainer = null;
    this.currentRoute = null;
  }
  
  init(appContainer) {
    this.appContainer = appContainer;
    
    // Definir rutas
    this.routes.set('/', () => this.renderCatalog());
    this.routes.set('/detail/:id', () => this.renderDetail());
    
    // Manejar navegación del browser
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });
    
    // Manejar clicks en enlaces
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[data-route]')) {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        this.navigate(path);
      }
    });
    
    // Cargar ruta inicial
    this.handleRoute();
  }
  
  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
  
  handleRoute() {
    const path = window.location.pathname;
    console.log('🔄 Navegando a:', path);
    
    // Limpiar contenedor
    if (this.appContainer) {
      this.appContainer.innerHTML = '';
    }
    
    // Encontrar y ejecutar ruta
    let routeFound = false;
    
    // Ruta exacta
    if (this.routes.has(path)) {
      this.routes.get(path)();
      routeFound = true;
    } else {
      // Ruta con parámetros
      for (let [route, handler] of this.routes) {
        if (this.matchRoute(route, path)) {
          handler();
          routeFound = true;
          break;
        }
      }
    }
    
    // Ruta no encontrada
    if (!routeFound && this.appContainer) {
      this.appContainer.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: #e74c3c;">
          <h2>❌ Página no encontrada</h2>
          <p>La ruta "${path}" no existe.</p>
          <button onclick="window.router.navigate('/')" style="padding: 0.5rem 1rem; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem;">
            Volver al catálogo
          </button>
        </div>
      `;
    }
    
    this.currentRoute = path;
  }
  
  matchRoute(route, path) {
    // Simple matching para :id parameters
    const routeParts = route.split('/');
    const pathParts = path.split('/');
    
    if (routeParts.length !== pathParts.length) {
      return false;
    }
    
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        continue; // Parameter match
      }
      if (routeParts[i] !== pathParts[i]) {
        return false;
      }
    }
    
    return true;
  }
  
  renderCatalog() {
    console.log('📋 Renderizando catálogo...');
    if (!this.appContainer) return;
    
    const catalog = document.createElement('fruit-catalog');
    this.appContainer.appendChild(catalog);
  }
  
  renderDetail() {
    console.log('🔍 Renderizando detalle...');
    if (!this.appContainer) return;
    
    const detail = document.createElement('fruit-detail');
    this.appContainer.appendChild(detail);
  }
  
  getCurrentRoute() {
    return this.currentRoute;
  }
  
  isDetailRoute() {
    return this.currentRoute && this.currentRoute.startsWith('/detail/');
  }
}

// Exportar para uso global
window.SimpleRouter = SimpleRouter;
window.router = new SimpleRouter();