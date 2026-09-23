export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      experiences: {
        Row: {
          best_time: string
          booking_required: boolean
          created_at: string
          description_en: string
          duration: string
          english_ease: number
          how_to_get_there_en: string
          id: number
          image_captions: string[]
          image_credits: Json
          image_urls: string[]
          interest_tags: string[]
          is_published: boolean
          localness: number
          map_url: string
          name_en: string
          price_level: string
          region: string
          related_slugs: string[]
          shorts_url: string | null
          slug: string
          style_tags: string[]
          tagline_en: string
          updated_at: string
          why_not_seoul_en: string
        }
        Insert: {
          best_time: string
          booking_required?: boolean
          created_at?: string
          description_en: string
          duration: string
          english_ease: number
          how_to_get_there_en: string
          id?: never
          image_captions: string[]
          image_credits?: Json
          image_urls?: string[]
          interest_tags?: string[]
          is_published?: boolean
          localness: number
          map_url: string
          name_en: string
          price_level: string
          region: string
          related_slugs?: string[]
          shorts_url?: string | null
          slug: string
          style_tags?: string[]
          tagline_en: string
          updated_at?: string
          why_not_seoul_en: string
        }
        Update: {
          best_time?: string
          booking_required?: boolean
          created_at?: string
          description_en?: string
          duration?: string
          english_ease?: number
          how_to_get_there_en?: string
          id?: never
          image_captions?: string[]
          image_credits?: Json
          image_urls?: string[]
          interest_tags?: string[]
          is_published?: boolean
          localness?: number
          map_url?: string
          name_en?: string
          price_level?: string
          region?: string
          related_slugs?: string[]
          shorts_url?: string | null
          slug?: string
          style_tags?: string[]
          tagline_en?: string
          updated_at?: string
          why_not_seoul_en?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_region_fkey"
            columns: ["region"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["region"]
          },
        ]
      }
      places: {
        Row: {
          area_en: string
          card_caption: string
          card_image_credit: Json | null
          card_image_url: string | null
          card_tagline_en: string
          created_at: string
          day: Json
          description_en: string
          headline_en: string
          hero_caption: string
          hero_image_credit: Json | null
          hero_image_url: string | null
          is_published: boolean
          lead_en: string
          name_en: string
          plan: Json
          region: string
          slug: string
          tagline_en: string
          updated_at: string
        }
        Insert: {
          area_en: string
          card_caption: string
          card_image_credit?: Json | null
          card_image_url?: string | null
          card_tagline_en: string
          created_at?: string
          day: Json
          description_en: string
          headline_en: string
          hero_caption: string
          hero_image_credit?: Json | null
          hero_image_url?: string | null
          is_published?: boolean
          lead_en: string
          name_en: string
          plan: Json
          region: string
          slug: string
          tagline_en: string
          updated_at?: string
        }
        Update: {
          area_en?: string
          card_caption?: string
          card_image_credit?: Json | null
          card_image_url?: string | null
          card_tagline_en?: string
          created_at?: string
          day?: Json
          description_en?: string
          headline_en?: string
          hero_caption?: string
          hero_image_credit?: Json | null
          hero_image_url?: string | null
          is_published?: boolean
          lead_en?: string
          name_en?: string
          plan?: Json
          region?: string
          slug?: string
          tagline_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      saved_experiences: {
        Row: {
          created_at: string
          experience_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          experience_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          experience_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_experiences_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
