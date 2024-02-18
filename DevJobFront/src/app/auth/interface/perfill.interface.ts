export interface ProfileResponse {
    message: string;
    statusCode: number;
    data: PerfilData[];
    error: boolean;
}

export interface Experiencia {
    id: number;
    profile_id: number;
    puesto: string;
    empresa: string;
    fecha_inicio: string;
    fecha_fin: string;
    created_at: string;
    updated_at: string;
}

export interface Educacion {
    id: number;
    profile_id: number;
    estado: number;
    nivel: string;
    institucion: string | null;
    fecha_inicio: string;
    fecha_fin: string;
    created_at: string;
    updated_at: string;
}

export interface PerfilData  {
    id: number;
    user_id: number;
    fecha_nacimiento: string | null;
    telefono: string | null;
    linkedin: string | null;
    facebook: string | null;
    github: string | null;
    presentacion: string | null;
    direccion: string | null;
    nacionalidad: string | null;
    dni: string | null;
    email: string;
    foto: string | null;
    created_at: string;
    updated_at: string;
    experiencia: Experiencia[];
    educacion: Educacion[] ;
}



