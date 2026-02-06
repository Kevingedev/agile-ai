class FruitCatalog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.fruits = [];
    this.loading = true;
    this.error = null;
  }
  
  async connectedCallback() {
    await this.loadFruits();
    this.render();
  }
  
  async loadFruits() {
    try {
      this.loading = true;
      this.render(); // Show loading state
      
      const response = await fetch('http://localhost:3100/frutas');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.fruits = await response.json();
      
      // Ordenamiento alfabético por nombre
      this.fruits.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
      
      this.loading = false;
      this.error = null;
      
    } catch (error) {
      console.error('Error loading fruits:', error);
      this.error = error.message;
      this.loading = false;
    }
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .catalog-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        .catalog-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .catalog-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .catalog-subtitle {
          color: #666;
          font-size: 1.1rem;
        }
        
        .fruit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
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
        
        .retry-button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
          transition: background 0.3s ease;
        }
        
        .retry-button:hover {
          background: #45a049;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .fruit-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1rem;
            padding: 1rem;
          }
          
          .catalog-container {
            padding: 1rem 0.5rem;
          }
          
          .catalog-title {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .fruit-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      </style>
      
      <div class="catalog-container">
        <div class="catalog-header">
          <h1 class="catalog-title">Nuestro Catálogo de Frutas</h1>
          <p class="catalog-subtitle">Descubre la frescura y calidad de nuestras frutas</p>
        </div>
        
        <div id="catalog-content">
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
          <p>Cargando nuestro catálogo de frutas...</p>
        </div>
      `;
    }
    
    if (this.error) {
      return `
        <div class="error-state">
          <div class="error-icon">⚠️</div>
          <h3>No pudimos cargar el catálogo</h3>
          <p>${this.error}</p>
          <button class="retry-button" onclick="this.getRootNode().host.loadFruits().then(() => this.getRootNode().host.render())">
            Intentar de nuevo
          </button>
        </div>
      `;
    }
    
    if (this.fruits.length === 0) {
      return `
        <div class="error-state">
          <div class="error-icon">🍎</div>
          <h3>No hay frutas disponibles</h3>
          <p>Por favor, intenta más tarde</p>
        </div>
      `;
    }
    
    return `
      <div class="fruit-grid">
        ${this.fruits.map(fruit => `
          <fruit-card 
            id="${fruit.id}"
            name="${fruit.nombre}" 
            price="${fruit.precio}" 
            image="${fruit.imagen}"
          ></fruit-card>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('fruit-catalog', FruitCatalog);