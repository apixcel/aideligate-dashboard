-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.calls (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  caller_number text NOT NULL,
  call_time timestamp with time zone NOT NULL DEFAULT now(),
  status USER-DEFINED NOT NULL,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT calls_pkey PRIMARY KEY (id),
  CONSTRAINT calls_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id)
);
CREATE TABLE public.clients (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  client_name text NOT NULL,
  client_email text,
  account_status USER-DEFINED NOT NULL DEFAULT 'active'::account_status,
  last_activity timestamp with time zone DEFAULT now(),
  calls_today integer NOT NULL DEFAULT 0,
  language_mix text,
  plan text NOT NULL DEFAULT 'Free Trial'::text CHECK (plan = ANY (ARRAY['Free Trial'::text, '299k'::text, '399k'::text, '699k'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT clients_pkey PRIMARY KEY (id),
  CONSTRAINT clients_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);