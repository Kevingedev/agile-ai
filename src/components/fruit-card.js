class FruitCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get observedAttributes() {
    return ['name', 'price', 'image', 'id'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    const name = this.getAttribute('name') || '';
    const price = this.getAttribute('price') || '0';
    const image = this.getAttribute('image') || '';
    const id = this.getAttribute('id') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          aspect-ratio: 1;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #f5f5f5;
          cursor: pointer;
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 12px rgba(0,0,0,0.15);
        }
        
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .fruit-name {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          backdrop-filter: blur(4px);
        }
        
        .fruit-price {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          background: #4CAF50;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;
        }
      </style>
      <div class="card" onclick="window.location.href='/fruit-detail.html?id=${id}'">
        <img class="card-image" src="${image}" alt="${name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5Ij5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4='">
        <div class="fruit-name">${name}</div>
        <div class="fruit-price">€${price}</div>
      </div>
    `;
  }
}

customElements.define('fruit-card', FruitCard);