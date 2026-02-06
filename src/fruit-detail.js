import './style.css'
import './components/app-header.js'

class FruitDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.fruit = null;
    this.loading = true;
    this.error = null;
  }
  
  async connectedCallback() {
    await this.loadFruitDetail();
    this.render();
  }
  
  async loadFruitDetail() {
    try {
      this.loading = true;
      this.render(); // Show loading state
      
      // Get ID from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const fruitId = urlParams.get('id');
      
      if (!fruitId) {
        throw new Error('No se proporcionó ID de fruta');
      }
      
      const response = await fetch(`http://localhost:3100/frutas/${fruitId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.fruit = await response.json();
      this.loading = false;
      this.error = null;
      
    } catch (error) {
      console.error('Error loading fruit detail:', error);
      this.error = error.message;
      this.loading = false;
    }
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .detail-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        .breadcrumb {
          margin-bottom: 2rem;
        }
        
        .breadcrumb-link {
          color: #4CAF50;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .breadcrumb-link:hover {
          color: #45a049;
        }
        
        .breadcrumb-separator {
          margin: 0 0.5rem;
          color: #666;
        }
        
        .breadcrumb-current {
          color: #666;
        }
        
        .detail-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .detail-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
        }
        
        .detail-content {
          padding: 2rem;
        }
        
        .detail-name {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 1rem;
        }
        
        .detail-price {
          font-size: 2rem;
          color: #4CAF50;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }
        
        .back-button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.3s ease;
        }
        
        .back-button:hover {
          background: #45a049;
        }
        
        .loading-state {
          text-align: center;
          padding: 4rem 2rem;
        }
        
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4CAF50;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }
        
        .error-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #e74c3c;
        }
        
        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .detail-container {
            padding: 1rem 0.5rem;
          }
          
          .detail-image {
            height: 250px;
          }
          
          .detail-content {
            padding: 1.5rem;
          }
          
          .detail-name {
            font-size: 2rem;
          }
          
          .detail-price {
            font-size: 1.5rem;
          }
        }
      </style>
      
      <div class="detail-container">
        <div class="breadcrumb">
          <a href="/" class="breadcrumb-link">Catálogo</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Detalle</span>
        </div>
        
        <div id="detail-content">
          ${this.renderContent()}
        </div>
      </div>
    `;
  }
  
  renderContent() {
    if (this.loading) {
      return `
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Cargando detalles de la fruta...</p>
        </div>
      `;
    }
    
    if (this.error) {
      return `
        <div class="error-state">
          <div class="error-icon">⚠️</div>
          <h3>No pudimos cargar los detalles</h3>
          <p>${this.error}</p>
          <a href="/" class="back-button">Volver al catálogo</a>
        </div>
      `;
    }
    
    if (!this.fruit) {
      return `
        <div class="error-state">
          <div class="error-icon">🍎</div>
          <h3>Fruta no encontrada</h3>
          <p>La fruta que buscas no existe</p>
          <a href="/" class="back-button">Volver al catálogo</a>
        </div>
      `;
    }
    
    return `
      <div class="detail-card">
        <img class="detail-image" src="${this.fruit.imagen}" alt="${this.fruit.nombre}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5Ij5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4='">
        <div class="detail-content">
          <h1 class="detail-name">${this.fruit.nombre}</h1>
          <div class="detail-price">€${this.fruit.precio}</div>
          <a href="/" class="back-button">Volver al catálogo</a>
        </div>
      </div>
    `;
  }
}

customElements.define('fruit-detail', FruitDetail);

// Initialize the detail page
function initializeDetailPage() {
  try {
    console.log('🚀 Initializing fruit detail page...');
    
    const app = document.getElementById('app');
    if (!app) {
      console.error('❌ #app container not found');
      return;
    }
    
    const detail = document.createElement('fruit-detail');
    app.appendChild(detail);
    
    console.log('✅ Fruit detail page initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing detail page:', error);
    
    // Fallback: show error message
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: #e74c3c;">
          <h2>⚠️ Error al cargar el detalle</h2>
          <p>Por favor, recarga la página o contacta con soporte.</p>
          <a href="/" style="padding: 0.5rem 1rem; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block;">
            Volver al catálogo
          </a>
        </div>
      `;
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDetailPage);
} else {
  initializeDetailPage();
}