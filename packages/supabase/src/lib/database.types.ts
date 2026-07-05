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
      onboarding_invites: {
        Row: {
          id: string;
          lead_id: string | null;
          email: string;
          sent_by: string | null;
          sent_at: string;
          completed_at: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          email: string;
          sent_by?: string | null;
          sent_at?: string;
          completed_at?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          lead_id?: string | null;
          email?: string;
          sent_by?: string | null;
          sent_at?: string;
          completed_at?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      onboarding_svar: {
        Row: {
          id: string;
          user_id: string;
          lead_id: string | null;
          invite_id: string | null;
          created_at: string;
          org_nr: string;
          foretaksnavn: string;
          selskapsform: string;
          bransje: string | null;
          adresse: string;
          kommune: string;
          registrert_enhetsreg: string;
          nettside: string | null;
          firmaattest_url: string | null;
          kontakt_navn: string;
          kontakt_rolle: string;
          kontakt_epost: string;
          kontakt_telefon: string;
          signaturrett: string;
          reelle_rettighetshavere: string;
          eierandeler: string;
          pep: string;
          statsborgerskap: string | null;
          bank: string | null;
          dagens_system: string | null;
          har_tripletex: string;
          forrige_regnskapsforer: string | null;
          tjenester: string[];
          antall_ansatte: number;
          omsetning_ifjor: number | null;
          mva_registrert: string;
          revisorpliktig: string;
          oppstartsdato: string | null;
          tilleggsinfo: string | null;
          samtykke: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          lead_id?: string | null;
          invite_id?: string | null;
          created_at?: string;
          org_nr: string;
          foretaksnavn: string;
          selskapsform: string;
          bransje?: string | null;
          adresse: string;
          kommune: string;
          registrert_enhetsreg: string;
          nettside?: string | null;
          firmaattest_url?: string | null;
          kontakt_navn: string;
          kontakt_rolle: string;
          kontakt_epost: string;
          kontakt_telefon: string;
          signaturrett: string;
          reelle_rettighetshavere: string;
          eierandeler: string;
          pep: string;
          statsborgerskap?: string | null;
          bank?: string | null;
          dagens_system?: string | null;
          har_tripletex: string;
          forrige_regnskapsforer?: string | null;
          tjenester?: string[];
          antall_ansatte: number;
          omsetning_ifjor?: number | null;
          mva_registrert: string;
          revisorpliktig: string;
          oppstartsdato?: string | null;
          tilleggsinfo?: string | null;
          samtykke: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          lead_id?: string | null;
          invite_id?: string | null;
          created_at?: string;
          org_nr?: string;
          foretaksnavn?: string;
          selskapsform?: string;
          bransje?: string | null;
          adresse?: string;
          kommune?: string;
          registrert_enhetsreg?: string;
          nettside?: string | null;
          firmaattest_url?: string | null;
          kontakt_navn?: string;
          kontakt_rolle?: string;
          kontakt_epost?: string;
          kontakt_telefon?: string;
          signaturrett?: string;
          reelle_rettighetshavere?: string;
          eierandeler?: string;
          pep?: string;
          statsborgerskap?: string | null;
          bank?: string | null;
          dagens_system?: string | null;
          har_tripletex?: string;
          forrige_regnskapsforer?: string | null;
          tjenester?: string[];
          antall_ansatte?: number;
          omsetning_ifjor?: number | null;
          mva_registrert?: string;
          revisorpliktig?: string;
          oppstartsdato?: string | null;
          tilleggsinfo?: string | null;
          samtykke?: boolean;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          role: Database['public']['Enums']['app_role'];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: Database['public']['Enums']['app_role'];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: Database['public']['Enums']['app_role'];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_superadmin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      app_role: 'customer' | 'superadmin';
    };
    CompositeTypes: Record<string, never>;
  };
};
