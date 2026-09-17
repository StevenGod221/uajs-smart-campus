$projectRoot = "C:\Users\Steven pc\uajs-smart-campus"
$backend = Join-Path $projectRoot "backend"

$services = @(
    "solicitudes-service",
    "reservas-service",
    "recursos-service",
    "notificaciones-service",
    "eventos-service"
)

foreach ($service in $services) {

    $servicePath = Join-Path $backend $service

    $appFiles = Get-ChildItem `
        -Path $servicePath `
        -Recurse `
        -Filter "*Application.java" `
        -ErrorAction SilentlyContinue

    if (-not $appFiles) {
        Write-Host "NO SE ENCONTRO Application.java en $service" -ForegroundColor Red
        continue
    }

    $appFile = $appFiles | Select-Object -First 1

    $content = Get-Content $appFile.FullName -Raw

    $packageMatch = [regex]::Match(
        $content,
        'package\s+([\w\.]+);'
    )

    if (-not $packageMatch.Success) {
        Write-Host "NO SE PUDO DETECTAR PACKAGE en $service" -ForegroundColor Red
        continue
    }

    $basePackage = $packageMatch.Groups[1].Value

    $javaRoot = Join-Path $servicePath "src\main\java"

    $packagePath = $basePackage -replace '\.', '\'

    $controllerDir = Join-Path `
        $javaRoot `
        "$packagePath\controller"

    New-Item `
        -ItemType Directory `
        -Path $controllerDir `
        -Force | Out-Null

    $java = @"
package $basePackage.controller;

import java.time.Instant;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, Object> health() {

        return Map.of(
            "status", "UP",
            "service", "$service",
            "timestamp", Instant.now().toString()
        );
    }
}
"@

    $target = Join-Path `
        $controllerDir `
        "HealthController.java"

    Set-Content `
        -Path $target `
        -Value $java `
        -Encoding UTF8

    Write-Host "OK -> $service" -ForegroundColor Green
}

Write-Host ""
Write-Host "HEALTH CHECKS CREADOS CORRECTAMENTE" -ForegroundColor Cyan