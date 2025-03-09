export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id: string;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          is_read: boolean;
          recipient_id: string;
          sender_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          is_read?: boolean;
          recipient_id: string;
          sender_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          is_read?: boolean;
          recipient_id?: string;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey";
            columns: ["recipient_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          author_id: string;
          content: string;
          created_at: string;
          department_id: string | null;
          id: string;
          is_anonymous: boolean;
          location: string | null;
          visibility: string;
        };
        Insert: {
          author_id: string;
          content: string;
          created_at?: string;
          department_id?: string | null;
          id?: string;
          is_anonymous?: boolean;
          location?: string | null;
          visibility?: string;
        };
        Update: {
          author_id?: string;
          content?: string;
          created_at?: string;
          department_id?: string | null;
          id?: string;
          is_anonymous?: boolean;
          location?: string | null;
          visibility?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          department: string | null;
          full_name: string | null;
          id: string;
          is_government: boolean;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          department?: string | null;
          full_name?: string | null;
          id: string;
          is_government?: boolean;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          department?: string | null;
          full_name?: string | null;
          id?: string;
          is_government?: boolean;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
