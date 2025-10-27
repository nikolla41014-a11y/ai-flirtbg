/*
  # Create generated_images table for AI Art Generator

  1. New Tables
    - `generated_images`
      - `id` (uuid, primary key) - Unique identifier for each generated image
      - `user_id` (uuid, foreign key) - References auth.users, tracks who created the image
      - `prompt` (text) - The user's description prompt
      - `style` (text) - The selected art style (silhouette, fantasy, glamour, portrait)
      - `image_url` (text) - The URL of the generated image
      - `created_at` (timestamptz) - When the image was generated
      
  2. Security
    - Enable RLS on `generated_images` table
    - Add policy for authenticated users to view their own images
    - Add policy for authenticated users to create new images
    - Add policy for authenticated users to delete their own images
    
  3. Indexes
    - Add index on user_id for faster queries
    - Add index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS generated_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prompt text NOT NULL,
  style text NOT NULL DEFAULT 'portrait',
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generated images"
  ON generated_images
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create generated images"
  ON generated_images
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own generated images"
  ON generated_images
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS generated_images_user_id_idx ON generated_images(user_id);
CREATE INDEX IF NOT EXISTS generated_images_created_at_idx ON generated_images(created_at DESC);