import './style.css'
import './components/app-header.js'
import './components/fruit-card.js'
import './components/fruit-catalog.js'

// Ensure components are loaded and then render catalog
function initializeApp() {
  try {
    console.log('🚀 Initializing fruit catalog app...');
    
    // Check if custom elements are defined
    if (!customElements.get('fruit-catalog')) {
      console.error('❌ fruit-catalog component not defined');
      return;
    }
    
    if (!customElements.get('fruit-card')) {
      console.error('❌ fruit-card component not defined');
      return;
    }
    
    console.log('✅ Components are defined, creating catalog...');
    
    const app = document.getElementById('app');
    if (!app) {
      console.error('❌ #app container not found');
      return;
    }
    
    const catalog = document.createElement('fruit-catalog');
    app.appendChild(catalog);
    
    console.log('✅ Fruit catalog initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    
    // Fallback: show error message
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: #e74c3c;">
          <h2>⚠️ Error al cargar el catálogo</h2>
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
