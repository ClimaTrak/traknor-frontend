# Application Architecture

## Login Flow

```mermaid
flowchart LR
  UI(Login Page) --> |submit credentials| AuthProvider
  AuthProvider --> |POST /api/auth/jwt/create/| API
  API --> |tokens| AuthProvider
  AuthProvider --> |store tokens & role| UI
  UI --> |navigate| Dashboard
```

