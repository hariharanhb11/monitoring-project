# 🏗️ High-Level Architecture

## Overview

This project deploys a containerized monitoring application on **Amazon EKS**. The application is exposed through an **AWS Load Balancer**, stores data in **PostgreSQL**, and is monitored using **Prometheus** and **Grafana**.

---

## Architecture Diagram

```text
                         Users
                           │
                           ▼
                AWS Elastic Load Balancer
                           │
                           ▼
                 Amazon EKS Cluster
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
 Monitoring Demo App (2 Pods)          PostgreSQL Database
        │                                     │
        └──────────────┬──────────────────────┘
                       │
                 Persistent Volume
                    (AWS EBS)

────────────────────────────────────────────────────────────

 Node Exporter      kube-state-metrics      Application Metrics
        │                    │                      │
        └────────────────────┴──────────────────────┘
                             │
                        Prometheus
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
               Alertmanager       Grafana
                                      │
                                      ▼
                               Monitoring Dashboards
```

---

## Components

| Component | Purpose |
|-----------|---------|
| Amazon EKS | Managed Kubernetes platform |
| Monitoring Demo | Sample application deployed on Kubernetes |
| PostgreSQL | Stores application data |
| AWS EBS | Persistent storage for PostgreSQL |
| Prometheus | Collects metrics from Kubernetes and applications |
| Grafana | Visualizes metrics using dashboards |
| Node Exporter | Collects node CPU, memory, disk, and network metrics |
| kube-state-metrics | Exposes Kubernetes object metrics |
| Alertmanager | Handles Prometheus alerts |

---

## Request Flow

```text
User
   │
   ▼
AWS Load Balancer
   │
   ▼
Monitoring Demo Application
   │
   ▼
PostgreSQL Database
```

---

## Monitoring Flow

```text
Nodes / Kubernetes / Application
              │
              ▼
         Prometheus
              │
      ┌───────┴────────┐
      ▼                ▼
 Alertmanager      Grafana
```

---

## Summary

- Application runs on **Amazon EKS**.
- Users access the application through an **AWS Load Balancer**.
- **PostgreSQL** stores persistent data on **AWS EBS**.
- **Prometheus** collects metrics from the cluster and application.
- **Grafana** provides dashboards for infrastructure and application monitoring.