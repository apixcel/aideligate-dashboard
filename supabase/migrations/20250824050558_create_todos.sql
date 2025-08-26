-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.appointments (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  patient_name character varying NOT NULL,
  date_time timestamp with time zone NOT NULL,
  service_type character varying NOT NULL,
  notes character varying,
  doctor_id uuid NOT NULL,
  client_id uuid NOT NULL,
  status USER-DEFINED NOT NULL DEFAULT 'scheduled'::appointment_status,
  CONSTRAINT appointments_pkey PRIMARY KEY (id),
  CONSTRAINT apppointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id),
  CONSTRAINT apppointments_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id)
);
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
  user_id uuid NOT NULL,
  client_name text NOT NULL,
  client_email text,
  account_status USER-DEFINED NOT NULL DEFAULT 'active'::account_status,
  last_activity timestamp with time zone NOT NULL DEFAULT now(),
  calls_today integer NOT NULL DEFAULT 0,
  language_mix text,
  plan text NOT NULL DEFAULT 'Free Trial'::text CHECK (plan = ANY (ARRAY['Free Trial'::text, '299k'::text, '399k'::text, '699k'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT clients_pkey PRIMARY KEY (id),
  CONSTRAINT clients_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.doctors (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  full_name character varying NOT NULL,
  client_id uuid NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT doctors_pkey PRIMARY KEY (id),
  CONSTRAINT doctors_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id)
);
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  user_name text NOT NULL,
  rating smallint NOT NULL CHECK (rating >= 1 AND rating <= 5),
  reply text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  media character varying,
  text text NOT NULL DEFAULT ''::text,
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id)
);
CREATE TABLE public.time_block (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  start_time time with time zone NOT NULL,
  end_time time with time zone NOT NULL,
  day_of_week smallint NOT NULL,
  client_id uuid NOT NULL,
  CONSTRAINT time_block_pkey PRIMARY KEY (id),
  CONSTRAINT time_block_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id)
);