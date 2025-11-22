graph TD
    %% Definición de estilos (Atractivo y Profesional)
    classDef user fill:#2d3e50,stroke:#2d3e50,stroke-width:2px,color:#fff;
    classDef frontend fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1;
    classDef backend fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20;
    classDef api fill:#fff8e1,stroke:#ff8f00,stroke-width:2px,color:#bf360c;
    classDef data fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c;
    classDef db fill:#eceff1,stroke:#455a64,stroke-width:2px,color:#37474f,shape:cylinder;
    classDef external fill:#fff,stroke:#333,stroke-width:1px,stroke-dasharray: 5 5,color:#333;

    %% Actores y Dispositivos Externos
    subgraph External_Actors [Actores Externos]
        direction LR
        Admin(👤 Administrador) ::: user
        RRHH(👤 RRHH) ::: user
        Tech(👤 Técnico) ::: user
        Biometric(📠 Dispositivo Biométrico) ::: external
    end

    %% Sistema Monolítico Django
    subgraph Monolithic_System [Aplicación Web (Django Framework)]
        direction TB

        %% Capa 1: Presentación
        subgraph Presentation_Layer [1. Capa de Presentación (Frontend)]
            Templates(📂 Templates HTML) ::: frontend
            Static(🎨 Archivos Estáticos CSS/JS) ::: frontend
            UI_Logic(🖥️ Interfaz de Usuario) ::: frontend
        end

        %% Capa 2: Lógica de Negocio
        subgraph Business_Layer [2. Capa de Lógica de Negocio]
            URLs(🔗 URLs / Enrutamiento) ::: backend
            Views(⚙️ Vistas / Lógica de Control) ::: backend
            Forms(📝 Formularios / Validación) ::: backend
            
            %% Módulos Específicos
            subgraph Modules [Módulos del Sistema]
                Mod_Auth[Gestión de Usuarios] ::: backend
                Mod_Attend[Asistencia] ::: backend
                Mod_Perf[Desempeño/Tickets] ::: backend
            end
        end

        %% Capa 3: API y Serialización
        subgraph API_Layer [3. Capa de API y Servicios]
            Serializers(🔄 Serializadores) ::: api
            API_Endpoints(📡 Endpoints REST) ::: api
        end

        %% Capa 4: Persistencia
        subgraph Persistence_Layer [4. Capa de Acceso a Datos]
            ORM(🗃️ Django ORM) ::: data
            Models(🧩 Modelos de Datos) ::: data
        end
    end

    %% Base de Datos Externa
    Database[(🛢️ Base de Datos PostgreSQL)] ::: db

    %% Relaciones y Flujo
    Admin -->|Solicitud HTTP| UI_Logic
    RRHH -->|Gestión| UI_Logic
    Tech -->|Consulta| UI_Logic

    UI_Logic -->|Renderiza| Templates
    Templates -->|Usa| Static
    
    UI_Logic <-->|Petición/Respuesta| URLs
    URLs --> Views
    
    Views --> Forms
    Views --> Modules
    
    %% Flujo Biométrico
    Biometric -->|Envía Marcación (JSON)| API_Endpoints
    API_Endpoints -->|Transforma Datos| Serializers
    Serializers -->|Valida| Views

    %% Acceso a Datos
    Modules -->|Consulta/Guarda| ORM
    Serializers -->|Consulta/Guarda| ORM
    ORM <-->|SQL| Database
    
    %% Conexión interna modelos
    Models --- ORM