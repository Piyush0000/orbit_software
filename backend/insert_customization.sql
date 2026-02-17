-- Insert website customization for toys store
INSERT INTO "WebsiteCustomization" (
  id,
  "storeId",
  logo,
  favicon,
  "brandColors",
  typography,
  "heroSection",
  features,
  "announcementBar",
  "aboutSection",
  "contactInfo",
  "socialLinks",
  "productSections",
  keywords,
  "createdAt",
  "updatedAt"
)
VALUES (
  gen_random_uuid(),
  'dc269cec-7e64-47a0-8ec3-549b08c00553',
  NULL,
  NULL,
  '{"primary": "#5FA8D3", "secondary": "#1E3A8A", "accent": "#F59E0B"}'::jsonb,
  '{"headingFont": "Inter", "bodyFont": "Inter"}'::jsonb,
  '{"title": "Spark Joy in Every Moment", "subtitle": "Discover amazing toys that help your little ones learn, grow, and have a blast.", "ctaText": "Shop Now", "ctaLink": "#products", "backgroundImage": null}'::jsonb,
  '[{"id": "1", "icon": "🎯", "title": "Quality Toys", "description": "Safe & Certified"}, {"id": "2", "icon": "🚀", "title": "Fast Shipping", "description": "Free on orders $50+"}, {"id": "3", "icon": "💝", "title": "Gift Wrapping", "description": "Available at checkout"}]'::jsonb,
  '{"enabled": true, "text": "🎉 Free shipping on orders over $50! Limited time offer.", "backgroundColor": "#5FA8D3", "textColor": "#FFFFFF"}'::jsonb,
  '{"title": "About Our Toy Store", "content": "We bring joy to children through carefully selected, high-quality toys that inspire creativity and learning.", "image": null}'::jsonb,
  '{"email": "hello@toystore.com", "phone": "1-800-TOY-STORE", "address": null}'::jsonb,
  '{"facebook": null, "instagram": null, "twitter": null}'::jsonb,
  '[{"id": "featured", "title": "Featured Collections", "subtitle": "Our hand-picked selections for your little ones", "category": "all", "limit": 8, "style": "grid"}, {"id": "educational", "title": "Learning & Growth", "subtitle": "Toys that challenge and inspire young minds", "category": "educational", "limit": 4, "style": "grid"}]'::jsonb,
  ARRAY[]::text[],
  NOW(),
  NOW()
)
ON CONFLICT ("storeId") 
DO UPDATE SET
  "brandColors" = EXCLUDED."brandColors",
  typography = EXCLUDED.typography,
  "heroSection" = EXCLUDED."heroSection",
  features = EXCLUDED.features,
  "announcementBar" = EXCLUDED."announcementBar",
  "aboutSection" = EXCLUDED."aboutSection",
  "contactInfo" = EXCLUDED."contactInfo",
  "socialLinks" = EXCLUDED."socialLinks",
  "productSections" = EXCLUDED."productSections",
  "updatedAt" = NOW();
