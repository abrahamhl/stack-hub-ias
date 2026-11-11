# Script para abrir directamente en el navegador las páginas exactas de Google Cloud
Write-Host "Abriendo páginas exactas de vinculación y credenciales de Google Cloud..." -ForegroundColor Cyan

# 1. Abrir página de Proyectos Vinculados a la Facturación
Start-Process "https://console.cloud.google.com/billing/projects"

# 2. Abrir página de Créditos activos
Start-Process "https://console.cloud.google.com/billing/credits"

# 3. Abrir página de Generación de Clave API (Google AI Studio)
Start-Process "https://aistudio.google.com/app/apikey"

Write-Host "Páginas abiertas en tu navegador predeterminado." -ForegroundColor Green
