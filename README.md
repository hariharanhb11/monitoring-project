# Enterprise Kubernetes Monitoring & Centralized Logging on AWS EKS

## Project Overview

This project demonstrates the implementation of a complete Kubernetes Monitoring and Centralized Logging solution on **Amazon Elastic Kubernetes Service (EKS)** using open-source observability tools.

The primary objective is to monitor the health and performance of a containerized application, Kubernetes cluster, worker nodes, and PostgreSQL database while providing centralized log collection for troubleshooting and operational visibility.

The solution follows production-inspired cloud monitoring practices by integrating Prometheus for metrics collection, Grafana for visualization, Fluent Bit for log forwarding, and Amazon CloudWatch Logs for centralized logging.

---

# Solution Architecture

```text
                              Users
                                │
                                ▼
                      AWS Application Load Balancer
                                │
                                ▼
                  Monitoring Demo Application (Node.js)
                                │
         ┌──────────────────────┴──────────────────────┐
         │                                             │
         ▼                                             ▼
   Prometheus Server                              Fluent Bit
         │                                             │
         ▼                                             ▼
      Grafana Dashboards                    Amazon CloudWatch Logs
         │
         ▼
  Kubernetes Metrics & Application Metrics
         │
         ▼
     PostgreSQL Database
```

---

# Objectives

The project implements the following observability capabilities:

* Kubernetes Cluster Monitoring
* Node Health Monitoring
* Pod Health Monitoring
* Application Monitoring
* CPU Monitoring
* Memory Monitoring
* Filesystem Monitoring
* Network Monitoring
* API Metrics Monitoring
* PostgreSQL Monitoring
* Custom Prometheus Alert Rules
* Centralized Log Collection
* Cloud-Based Log Storage

---

# Technology Stack

| Category                | Technology              |
| ----------------------- | ----------------------- |
| Cloud Platform          | AWS                     |
| Container Orchestration | Kubernetes (Amazon EKS) |
| Container Runtime       | Docker                  |
| Application             | Node.js                 |
| Database                | PostgreSQL              |
| Monitoring              | Prometheus              |
| Visualization           | Grafana                 |
| Node Metrics            | Node Exporter           |
| Kubernetes Metrics      | kube-state-metrics      |
| Service Discovery       | ServiceMonitor          |
| Alert Rules             | PrometheusRule          |
| Logging                 | Fluent Bit              |
| Log Storage             | Amazon CloudWatch Logs  |
| Package Manager         | Helm                    |

---

# Project Structure

```text
monitoring-demo/
│
├── app/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── ...
│
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── postgres.yaml
│   ├── servicemonitor.yaml
│   ├── prometheus-rule.yaml
│   ├── namespace.yaml
│   └── ...
│
├── screenshots/
│
├── architecture/
│
├── docs/
│
└── README.md
```

---

# Solution Components

## Amazon EKS

Amazon EKS hosts the Kubernetes cluster that runs the monitoring application, PostgreSQL database, Prometheus stack, Grafana, Fluent Bit, and supporting monitoring components.

---

## Monitoring Demo Application

A containerized Node.js application deployed on Kubernetes.

The application exposes Prometheus metrics through the `/metrics` endpoint, allowing Prometheus to scrape application metrics.

---

## PostgreSQL Database

A PostgreSQL database deployed inside the Kubernetes cluster provides persistent storage for the application.

---

## Prometheus

Prometheus continuously scrapes metrics from Kubernetes components and the monitoring application.

Collected metrics include:

* Application Metrics
* CPU Usage
* Memory Usage
* Network Statistics
* Filesystem Usage
* Kubernetes Cluster Metrics
* Node Metrics
* Pod Metrics

---

## Grafana

Grafana provides interactive dashboards for visualizing collected metrics.

The following dashboards were imported:

### Node Exporter Dashboard (ID: 1860)

Provides:

* CPU Usage
* Memory Usage
* Filesystem Usage
* Network Traffic
* Disk Usage
* System Load

---

### Kubernetes Cluster Dashboard (ID: 15757)

Provides:

* Cluster Health
* Nodes
* Namespaces
* Pod Distribution
* Resource Utilization

---

### Kubernetes Pod Dashboard (ID: 6417)

Provides:

* Pod CPU
* Pod Memory
* Pod Network
* Pod Restarts
* Container Statistics

---

### Kubernetes Deployment Dashboard (ID: 8588)

Provides:

* Deployment Health
* Replica Availability
* Deployment Status
* Replica Count

---

## Node Exporter

Node Exporter exposes operating system metrics for worker nodes.

Metrics include:

* CPU
* Memory
* Filesystem
* Disk
* Network
* Load Average

---

## kube-state-metrics

Provides Kubernetes object metrics including:

* Deployments
* ReplicaSets
* StatefulSets
* Pods
* Nodes
* Services
* Namespaces

---

## ServiceMonitor

ServiceMonitor enables Prometheus Operator to automatically discover and scrape the monitoring application without manually editing Prometheus configuration.

---

## PrometheusRule

Custom alert rules were created for monitoring application health.

Configured alerts include:

* MonitoringDemoDown
* HighCPUUsage
* HighMemoryUsage
* PodRestarting

These alerts are evaluated continuously by Prometheus.

---

## Fluent Bit

Fluent Bit runs as a DaemonSet on every Kubernetes worker node.

Responsibilities include:

* Collecting container logs
* Reading Kubernetes metadata
* Forwarding logs to CloudWatch

---

## Amazon CloudWatch Logs

CloudWatch serves as the centralized log storage solution.

Benefits include:

* Centralized log management
* Application troubleshooting
* Kubernetes log collection
* Historical log analysis

---

# Monitoring Workflow

```text
Application
      │
      ▼
Prometheus
      │
      ▼
Grafana
```

Prometheus continuously scrapes metrics from Kubernetes and the monitoring application.

Grafana queries Prometheus and visualizes the collected metrics using interactive dashboards.

---

# Logging Workflow

```text
Kubernetes Pods
      │
      ▼
Fluent Bit
      │
      ▼
Amazon CloudWatch Logs
```

Fluent Bit collects container logs from every worker node and forwards them to CloudWatch Logs for centralized storage and analysis.

---

# Metrics Monitored

## Infrastructure Metrics

* CPU Utilization
* Memory Utilization
* Disk Usage
* Filesystem Usage
* Network Traffic
* Node Load

---

## Kubernetes Metrics

* Node Status
* Pod Status
* Deployment Health
* Replica Count
* Namespace Usage
* Container Status

---

## Application Metrics

* Application Availability
* HTTP Requests
* API Metrics
* Response Metrics
* Application Uptime

---

## Database Metrics

* PostgreSQL Availability
* Database Connectivity
* Database Health

---

# Validation

The monitoring solution was validated using the following checks.

## Application Validation

* Application successfully deployed on Amazon EKS.
* Application accessible through AWS Load Balancer.
* Metrics endpoint successfully exposed.

---

## Prometheus Validation

* Prometheus successfully discovered the application through ServiceMonitor.
* Application targets reported as **UP**.
* Metrics successfully scraped.

---

## Grafana Validation

The imported dashboards successfully displayed:

* Node Metrics
* Cluster Metrics
* Pod Metrics
* Deployment Metrics

Real-time updates were verified by generating application traffic.

---

## Traffic Generation

Application traffic was generated using repeated HTTP requests.

This verified:

* Live Prometheus metrics
* Dynamic Grafana graphs
* API request activity

---

## Logging Validation

Application logs were successfully collected and stored in Amazon CloudWatch Logs.

Centralized logging was verified through CloudWatch Log Groups.

---

## Alert Validation

Custom Prometheus alert rules were deployed successfully.

Application availability alerts were validated by temporarily scaling the deployment down and observing the alert transition to the **Firing** state in Prometheus.

---

# Features

* Amazon EKS Deployment
* Kubernetes Native Monitoring
* Prometheus Metrics Collection
* Grafana Visualization
* Node Monitoring
* Pod Monitoring
* Deployment Monitoring
* Application Monitoring
* PostgreSQL Integration
* Custom Alert Rules
* Centralized Logging
* CloudWatch Integration
* Helm-based Deployment

---

# Benefits

* Real-time Infrastructure Monitoring
* Centralized Metrics Collection
* Kubernetes Health Visibility
* Performance Analysis
* Faster Incident Troubleshooting
* Production-Oriented Monitoring Architecture
* Centralized Log Management
* Scalable Observability Platform

---

# Future Enhancements

The solution can be extended with additional enterprise capabilities such as:

* Alertmanager Email Notifications
* Amazon SNS Integration
* Slack Notifications
* Microsoft Teams Notifications
* Amazon Managed Prometheus
* Amazon Managed Grafana
* Loki for Log Aggregation
* Jaeger Distributed Tracing
* OpenTelemetry Integration
* Advanced PostgreSQL Monitoring
* Custom Business Metrics

---

# Conclusion

This project demonstrates an end-to-end Kubernetes observability platform built on Amazon EKS using Prometheus, Grafana, Fluent Bit, and Amazon CloudWatch Logs.

The implemented solution provides comprehensive visibility into infrastructure, Kubernetes resources, application performance, and centralized logging. By combining real-time metrics collection, dashboard visualization, custom alert rules, and cloud-native log management, the project showcases a production-inspired monitoring architecture that aligns with modern DevOps and Site Reliability Engineering (SRE) practices.

