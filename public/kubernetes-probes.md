# Kubernetes Probes: Liveness, Readiness, and Startup

Kubernetes Probes are essential features used to **monitor the health and availability** of your containers running inside Pods. Kubernetes offers three types of probes:

- **Liveness Probe**: Checks if the container is alive.
- **Readiness Probe**: Checks if the container is ready to accept traffic.
- **Startup Probe**: Checks if the container application has started.

---

## 1. Liveness Probe

**Purpose**: To determine if the application is running. If the liveness probe fails, the container is **killed and restarted**.

### Example:
```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 3
  periodSeconds: 5
```

---

## 2. Readiness Probe

**Purpose**: To determine if the application is ready to handle requests. If the readiness probe fails, the container is **removed from the Service endpoint**.

### Example:
```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
```

---

## 3. Startup Probe

**Purpose**: Useful for slow-starting applications. If the startup probe fails, the container is considered failed.

**Note**: When `startupProbe` is defined, `livenessProbe` and `readinessProbe` are **disabled** until startup succeeds.

### Example:
```yaml
startupProbe:
  httpGet:
    path: /startup
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
```

---

## Probe Handler Types

All probes support these handlers:

- `httpGet`: Sends an HTTP GET request.
- `tcpSocket`: Performs a TCP check.
- `exec`: Executes a command inside the container.

---

## Best Practices

- Use **livenessProbe** to recover from deadlocks.
- Use **readinessProbe** to avoid sending traffic to non-ready containers.
- Use **startupProbe** for applications with long boot times.

---

## References

- [Kubernetes Probes Official Docs](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
