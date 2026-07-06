# ☸️ Kubernetes Architecture

## Overview

This project is deployed on **Amazon Elastic Kubernetes Service (EKS)** in **AWS us-east-1**.

Amazon EKS manages the Kubernetes **Control Plane**, while **2 Worker Nodes** run the application and monitoring workloads.

---

# Cluster Information

| Property | Value |
|----------|-------|
| Cloud Provider | AWS |
| Kubernetes Platform | Amazon EKS |
| Cluster Name | monitoring-demo |
| Region | us-east-1 |
| Kubernetes Version | v1.31 |
| Platform Version | eks.64 |
| Worker Nodes | 2 |

---

# Amazon EKS Kubernetes Architecture

```text
                                    AWS Cloud
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Amazon EKS Cluster                              │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │               EKS Control Plane (Managed by AWS)                      │  │
│  │                                                                       │  │
│  │  • Kubernetes API Server                                              │  │
│  │  • Scheduler                                                          │  │
│  │  • Controller Manager                                                 │  │
│  │  • etcd                                                               │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                      │                                      │
│                                      ▼                                      │
│                        Kubernetes Worker Nodes (2)                          │
│                                                                             │
│   ┌────────────────────────────┐      ┌────────────────────────────┐        │
│   │        Worker Node 1       │      │        Worker Node 2       │        │
│   │────────────────────────────│      │────────────────────────────│        │
│   │ • kubelet                  │      │ • kubelet                  │        │
│   │ • kube-proxy               │      │ • kube-proxy               │        │
│   │ • containerd               │      │ • containerd               │        │
│   │ • Application Pods         │      │ • Monitoring Pods          │        │
│   │ • Node Exporter            │      │ • Node Exporter            │        │
│   └────────────────────────────┘      └────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                          Kubernetes Resources
                                      │
      ┌──────────────┬──────────────┬──────────────┬──────────────┐
      │              │              │              │
      ▼              ▼              ▼              ▼
 Namespaces     Deployments    StatefulSets    DaemonSets
      │              │              │              │
      ▼              ▼              ▼              ▼
 ConfigMaps     ReplicaSets     Prometheus     Node Exporter
 Secrets             │
                     ▼
                    Pods
                     │
         ┌───────────┴────────────┐
         ▼                        ▼
  monitoring-demo            PostgreSQL
         │                        │
         └────────────┬───────────┘
                      ▼
                  Kubernetes Services
                      │
                      ▼
          AWS Elastic Load Balancer
                      │
                      ▼
                     Users
```

---

# Kubernetes Resources

| Resource | Running | Verification Command |
|----------|:-------:|----------------------|
| Worker Nodes | **2** | `kubectl get nodes` |
| Namespaces | **6** | `kubectl get ns` |
| Deployments | **8** | `kubectl get deployments -A` |
| ReplicaSets | **8** | `kubectl get rs -A` |
| StatefulSets | **1** | `kubectl get statefulsets -A` |
| DaemonSets | **6** | `kubectl get daemonsets -A` |
| Pods | **21** | `kubectl get pods -A` |
| Services | **18** | `kubectl get svc -A` |
| Persistent Volume Claims | **1** | `kubectl get pvc -A` |
| ConfigMaps | **38+** | `kubectl get configmaps -A` |
| Secrets | **9** | `kubectl get secrets -A` |
| Ingress | **0** | `kubectl get ingress -A` |

---

# Kubernetes Components

| Component | Running | Purpose |
|-----------|:------:|---------|
| Namespace | **6** | Logically separates Kubernetes resources. |
| Pod | **21** | Smallest deployable unit that runs one or more containers. |
| Deployment | **8** | Manages stateless applications and rolling updates. |
| ReplicaSet | **8** | Ensures the required number of Pod replicas are running. |
| StatefulSet | **1** | Manages stateful workloads with persistent storage. |
| DaemonSet | **6** | Runs one Pod on every worker node. |
| Service | **18** | Provides networking and communication between Pods. |
| Persistent Volume Claim (PVC) | **1** | Requests persistent storage from Kubernetes. |
| ConfigMap | **38+** | Stores non-sensitive application configuration. |
| Secret | **9** | Stores sensitive information such as credentials. |

---

# Monitoring Architecture

```text
                    Kubernetes Cluster
                           │
     ┌─────────────────────┼─────────────────────┐
     │                     │                     │
     ▼                     ▼                     ▼
Node Exporter     kube-state-metrics     Application Metrics
                                             (/metrics)
     └─────────────────────┼─────────────────────┘
                           ▼
                    ServiceMonitor
                           │
                           ▼
                      Prometheus
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
          Alertmanager            Grafana
                                       │
                                       ▼
                                Dashboards
```

---

# Storage Architecture

```text
PostgreSQL Pod
       │
       ▼
Persistent Volume Claim (5 GiB)
       │
       ▼
AWS EBS Persistent Volume
```

---

# Useful Verification Commands

| Purpose | Command |
|---------|---------|
| View Worker Nodes | `kubectl get nodes -o wide` |
| View Resource Usage | `kubectl top nodes` |
| View All Pods | `kubectl get pods -A -o wide` |
| View Deployments | `kubectl get deployments -A` |
| View StatefulSets | `kubectl get statefulsets -A` |
| View DaemonSets | `kubectl get daemonsets -A` |
| View Services | `kubectl get svc -A` |
| View PVCs | `kubectl get pvc -A` |
| View ConfigMaps | `kubectl get configmaps -A` |
| View Secrets | `kubectl get secrets -A` |
| View Ingress | `kubectl get ingress -A` |
| View ReplicaSets | `kubectl get rs -A` |
| View Namespaces | `kubectl get ns` |

---

# Summary

- Amazon EKS manages the Kubernetes Control Plane.
- Two worker nodes host the application and monitoring workloads.
- Deployments manage stateless applications and ReplicaSets maintain Pod availability.
- Prometheus runs as a StatefulSet with persistent storage.
- DaemonSets run node-level services such as Node Exporter.
- Services provide internal communication and expose the application through an AWS Load Balancer.
- Grafana visualizes metrics collected by Prometheus.
- PostgreSQL stores application data using an AWS EBS-backed Persistent Volume.