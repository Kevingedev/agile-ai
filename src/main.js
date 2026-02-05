import './style.css'
import './router.js'
import './components/app-header.js'
import './components/fruit-card.js'
import './components/fruit-catalog.js'
import './components/fruit-detail.js'

// Ensure components are loaded and then initialize router
function initializeApp() {
  try {
    console.log('🚀 Initializing fruit catalog app with SPA routing...');
    
    // Check if required components are defined
    const requiredComponents = ['fruit-catalog', 'fruit-card', 'fruit-detail'];
    for (const component of requiredComponents) {
      if (!customElements.get(component)) {
        console.error(`❌ ${component} component not defined`);
        return;
      }
    }
    
    // Check if router is available
    if (!window.router) {
      console.error('❌ Router not available');
      return;
    }
    
    console.log('✅ All components and router are defined, initializing...');
    
    const app = document.getElementById('app');
    if (!app) {
      console.error('❌ #app container not found');
      return;
    }
    
    // Initialize router with app container
    window.router.init(app);
    
    console.log('✅ Fruit catalog SPA initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    
    // Fallback: show error message
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: #e74c3c;">
          <h2>⚠️ Error al cargar la aplicación</h2>
          <p>Por favor, recarga la página o contacta con soporte.</p>
          <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Recargar página
          </button>
        </div>
      `;
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
