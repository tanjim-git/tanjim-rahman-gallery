
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (public site content)
CREATE POLICY "Anyone can view settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- Admins can update
CREATE POLICY "Admins can insert settings"
  ON public.site_settings FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed defaults
INSERT INTO public.site_settings (key, value) VALUES
('hero', '{"name": "Tanjim Rahman", "tagline": "Fine Art & Portrait Photography", "description": "Capturing light, telling stories, and turning fleeting moments into timeless art — from Dhaka to the world.", "cta_text": "View Portfolio", "cta2_text": "Book a Session", "available_text": "Available for 2026 bookings"}'::jsonb),
('about', '{"heading": "The Eye Behind the Lens", "subheading": "About Tanjim", "bio": "For over a decade, I have pursued the quiet art of seeing — finding beauty in ordinary light, intimacy in fleeting glances, and narrative in still frames.\n\nBased in Dhaka, I work across South Asia and beyond, bringing a fine-art sensibility to every portrait, wedding, and editorial commission. My approach is unhurried, intentional, and deeply personal.", "stats": [{"value": "12+", "label": "Years of Experience"}, {"value": "800+", "label": "Stories Captured"}, {"value": "15+", "label": "Countries"}]}'::jsonb),
('contact', '{"heading": "Let''s Create Together", "subheading": "Get in Touch", "description": "Whether it''s a portrait session, a wedding, or a creative collaboration — I''d love to hear your story.", "email": "hello@tanjimrahman.com", "phone": "+880 1XXX-XXXXXX", "studio": "Gulshan 2, Dhaka, Bangladesh", "instagram": "@tanjimrahman.photo", "instagram_url": "https://instagram.com/tanjimrahman.photo"}'::jsonb),
('footer', '{"tagline": "Capturing light. Telling stories.", "copyright": "Tanjim Rahman Photography"}'::jsonb);
