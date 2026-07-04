export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          navn: string;
          epost: string;
          telefon: string;
          selskapsform: string;
          bokforing: string;
          bilag: string;
          ansatte: string;
          omsetning_aar1: number;
          omsetning_aar2: number;
          revisorpliktig: string;
          anbefaling: string;
          estimat: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          navn: string;
          epost: string;
          telefon: string;
          selskapsform: string;
          bokforing: string;
          bilag: string;
          ansatte: string;
          omsetning_aar1: number;
          omsetning_aar2: number;
          revisorpliktig: string;
          anbefaling: string;
          estimat: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          navn?: string;
          epost?: string;
          telefon?: string;
          selskapsform?: string;
          bokforing?: string;
          bilag?: string;
          ansatte?: string;
          omsetning_aar1?: number;
          omsetning_aar2?: number;
          revisorpliktig?: string;
          anbefaling?: string;
          estimat?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
