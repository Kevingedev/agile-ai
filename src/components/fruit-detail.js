class FruitDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.fruit = null;
    this.loading = true;
    this.error = null;
  }
  
  connectedCallback() {
    this.render();
    this.loadFruitData();
  }
  
  async loadFruitData() {
    try {
      const id = this.getFruitIdFromUrl();
      if (!id) {
        this.error = 'No se proporcionó ID de fruta';
        this.loading = false;
        this.render();
        return;
      }
      
      const response = await fetch(`http://localhost:3100/frutas/${id}`);
      if (!response.ok) {
        throw new Error('Fruta no encontrada');
      }
      
      this.fruit = await response.json();
      this.loading = false;
      this.render();
    } catch (error) {
      this.error = error.message;
      this.loading = false;
      this.render();
    }
  }
  
  getFruitIdFromUrl() {
    const path = window.location.pathname;
    const match = path.match(/\/detail\/(\d+)/);
    return match ? match[1] : null;
  }
  
  goBack() {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .detail-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .back-button {
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }
        
        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
        }
        
        .loading, .error {
          text-align: center;
          padding: 4rem 2rem;
          color: #333;
        }
        
        .loading {
          font-size: 1.2rem;
        }
        
        .error {
          color: #e74c3c;
          font-size: 1.1rem;
        }
        
        .fruit-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        
        .fruit-image-container {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          aspect-ratio: 1;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .fruit-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .fruit-info {
          padding: 1rem;
        }
        
        .fruit-name {
          font-size: 3rem;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .fruit-price {
          font-size: 2rem;
          color: #4CAF50;
          font-weight: bold;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #4CAF50, #45a049);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .fruit-details {
          background: rgba(76, 175, 80, 0.1);
          border-left: 4px solid #4CAF50;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 2rem;
        }
        
        .detail-item {
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .detail-label {
          font-weight: 600;
          color: #555;
        }
        
        .detail-value {
          font-weight: bold;
          color: #333;
        }
        
        @media (max-width: 768px) {
          .detail-container {
            padding: 1rem;
          }
          
          .glass-card {
            padding: 1.5rem;
          }
          
          .fruit-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .fruit-name {
            font-size: 2rem;
          }
          
          .fruit-price {
            font-size: 1.5rem;
          }
        }
      </style>
      
      <div class="detail-container">
        <div class="glass-card">
          <button class="back-button" onclick="this.getRootNode().host.goBack()">
            ← Volver al catálogo
          </button>
          
          ${this.loading ? `
            <div class="loading">
              <div>Cargando detalles de la fruta...</div>
            </div>
          ` : this.error ? `
            <div class="error">
              <div>❌ ${this.error}</div>
              <button class="back-button" style="margin-top: 1rem;" onclick="this.getRootNode().host.goBack()">
                ← Volver al catálogo
              </button>
            </div>
          ` : this.fruit ? `
            <div class="fruit-content">
              <div class="fruit-image-container">
                <img 
                  class="fruit-image" 
                  src="${this.fruit.imagen}" 
                  alt="${this.fruit.nombre}"
                  onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5Ij5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4='"
                >
              </div>
              
              <div class="fruit-info">
                <h1 class="fruit-name">${this.fruit.nombre}</h1>
                <div class="fruit-price">€${this.fruit.precio}</div>
                
                <div class="fruit-details">
                  <div class="detail-item">
                    <span class="detail-label">ID:</span>
                    <span class="detail-value">#${this.fruit.id}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Nombre:</span>
                    <span class="detail-value">${this.fruit.nombre}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Precio:</span>
                    <span class="detail-value">€${this.fruit.precio}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Disponibilidad:</span>
                    <span class="detail-value" style="color: #4CAF50;">✓ En stock</span>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('fruit-detail', FruitDetail);