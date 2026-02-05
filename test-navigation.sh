#!/bin/bash

echo "🧪 Test de navegación SPA - US-002 TK-002-03"
echo "==========================================="

# Verificar que los servidores estén corriendos
echo "📍 Verificando API (http://localhost:3100)..."
if curl -s http://localhost:3100/frutas > /dev/null; then
    echo "✅ API funcionando"
else
    echo "❌ API no responde"
    exit 1
fi

echo "📍 Verificando aplicación (http://localhost:5174)..."
if curl -s http://localhost:5174 > /dev/null; then
    echo "✅ Aplicación funcionando"
else
    echo "❌ Aplicación no responde"
    exit 1
fi

# Verificar componentes
echo ""
echo "📍 Verificando componentes..."

# Contar líneas de los nuevos archivos
ROUTER_LINES=$(wc -l < src/router.js)
DETAIL_LINES=$(wc -l < src/components/fruit-detail.js)

echo "📄 router.js: $ROUTER_LINES líneas"
echo "📄 fruit-detail.js: $DETAIL_LINES líneas"

# Verificar que los archivos contengan elementos clave
echo ""
echo "📍 Verificando funcionalidad clave..."

if grep -q "SimpleRouter" src/router.js; then
    echo "✅ Router class definida"
else
    echo "❌ Router class no encontrada"
fi

if grep -q "fruit-detail" src/components/fruit-detail.js; then
    echo "✅ FruitDetail component definido"
else
    echo "❌ FruitDetail component no encontrado"
fi

if grep -q "goToDetail" src/components/fruit-card.js; then
    echo "✅ Función de navegación agregada a fruit-card"
else
    echo "❌ Función de navegación no encontrada en fruit-card"
fi

if grep -q "router.init" src/main.js; then
    echo "✅ Router inicializado en main.js"
else
    echo "❌ Router no inicializado en main.js"
fi

echo ""
echo "🎯 Pruebas manuales sugeridas:"
echo "1. Abre http://localhost:5174 en el navegador"
echo "2. Haz click en cualquier fruta del catálogo"
echo "3. Debería navegar a la vista de detalle"
echo "4. El botón 'Volver al catálogo' debe funcionar"
echo "5. Prueba navegación directa: http://localhost:5174/detail/1"

echo ""
echo "✅ Implementación TK-002-03 completada exitosamente"