$ErrorActionPreference = "Continue"

$raiz = "C:\Proyectos\uajs-smart-campus"
$backend = "$raiz\backend"

Write-Host "`n===== UAJS SMART CAMPUS =====" -ForegroundColor Cyan

# 1. Iniciar MySQL con el nombre real del servicio
Write-Host "`nComprobando MySQL..." -ForegroundColor Yellow

$mysql = Get-Service -Name "stevengod" -ErrorAction SilentlyContinue

if ($mysql) {
    if ($mysql.Status -ne "Running") {
        try {
            Start-Service -Name "stevengod" -ErrorAction Stop
            Write-Host "MySQL iniciado." -ForegroundColor Green
        }
        catch {
            Write-Host "No se pudo iniciar MySQL: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    else {
        Write-Host "MySQL ya esta iniciado." -ForegroundColor Green
    }
}
else {
    Write-Host "No se encontro el servicio MySQL stevengod." -ForegroundColor Red
}

# Esperar a que MySQL acepte conexiones
$mysqlListo = $false

for ($i = 0; $i -lt 15; $i++) {
    if (Test-NetConnection localhost -Port 3306 `
        -InformationLevel Quiet -WarningAction SilentlyContinue) {
        $mysqlListo = $true
        break
    }
    Start-Sleep -Seconds 2
}

if ($mysqlListo) {
    Write-Host "MySQL responde en el puerto 3306." -ForegroundColor Green
}
else {
    Write-Host "ATENCION: MySQL no responde en el puerto 3306." -ForegroundColor Red
}

# 2. Iniciar los microservicios Java
$servicios = @(
    "usuarios-service",
    "solicitudes-service",
    "reservas-service",
    "recursos-service",
    "notificaciones-service",
    "eventos-service"
)

foreach ($servicio in $servicios) {
    $ruta = "$backend\$servicio"

    if (Test-Path "$ruta\mvnw.cmd") {
        Write-Host "Iniciando $servicio..." -ForegroundColor Yellow

        Start-Process powershell.exe -ArgumentList @(
            "-NoExit",
            "-Command",
            "Set-Location '$ruta'; .\mvnw.cmd spring-boot:run"
        )

        Start-Sleep -Seconds 2
    }
    else {
        Write-Host "No se encontro la carpeta o mvnw.cmd: $ruta" -ForegroundColor Red
    }
}

# 3. Iniciar API Gateway
$gateway = "$backend\api-gateway"

if (Test-Path "$gateway\package.json") {
    Write-Host "Iniciando API Gateway..." -ForegroundColor Yellow

    Start-Process powershell.exe -ArgumentList @(
        "-NoExit",
        "-Command",
        "Set-Location '$gateway'; npm.cmd run dev"
    )
}
else {
    Write-Host "No se encontro el API Gateway." -ForegroundColor Red
}

# 4. Iniciar frontend
$frontend = "$raiz\frontend"

if (Test-Path "$frontend\package.json") {
    Write-Host "Iniciando frontend..." -ForegroundColor Yellow

    Start-Process powershell.exe -ArgumentList @(
        "-NoExit",
        "-Command",
        "Set-Location '$frontend'; npm.cmd run dev"
    )
}
else {
    Write-Host "No se encontro el frontend." -ForegroundColor Red
}

Write-Host "`nInicio solicitado." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "No cierres las ventanas de los servicios." -ForegroundColor Yellow

Read-Host "Presiona Enter para cerrar esta ventana"