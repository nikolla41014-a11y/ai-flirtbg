import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Sparkles, Heart, Trash2, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STYLES = [
  { id: 'silhouette', label: 'Silhouette', description: 'Elegant couple silhouettes' },
  { id: 'fantasy', label: 'Fantasy', description: 'Magical romantic scenes' },
  { id: 'glamour', label: 'Glamour', description: 'Sophisticated elegance' },
  { id: 'portrait', label: 'Soft Portrait', description: 'Tender romantic moments' }
];

interface GeneratedImage {
  id: string;
  prompt: string;
  style: string;
  image_url: string;
  created_at: string;
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("portrait");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gallery, setGallery] = useState<GeneratedImage[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadGallery();
  }, [user, navigate]);

  const loadGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('generated_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGallery(data || []);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the romantic scene you'd like to create",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-romantic-image',
        {
          body: { prompt: prompt.trim(), style: selectedStyle },
          headers: {
            Authorization: `Bearer ${session?.access_token}`
          }
        }
      );

      if (functionError) {
        if (functionError.message?.includes('inappropriate')) {
          toast({
            title: "Content Filter",
            description: "Please keep your prompts romantic and tasteful",
            variant: "destructive"
          });
        } else if (functionError.message?.includes('Rate limit')) {
          toast({
            title: "Too Many Requests",
            description: "Please wait a moment before generating another image",
            variant: "destructive"
          });
        } else {
          throw functionError;
        }
        return;
      }

      if (functionData?.image) {
        setGallery(prev => [functionData.image, ...prev]);
        setPrompt("");
        toast({
          title: "Image Generated!",
          description: "Your romantic artwork has been created and saved to your gallery",
        });
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from('generated_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      setGallery(prev => prev.filter(img => img.id !== imageId));
      toast({
        title: "Image Deleted",
        description: "Image removed from your gallery"
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete Failed",
        description: "Unable to delete image",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-50 via-romantic-100 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-romantic-600 to-romantic-800 bg-clip-text text-transparent">
            Romantic AI Art Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create beautiful, artistic illustrations of romantic moments. All images are tasteful, safe-for-work, and AI-generated.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-romantic-200">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Describe your romantic scene
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., A couple walking hand in hand on a sunset beach..."
                  className="min-h-[100px] resize-none"
                  disabled={isGenerating}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  Choose a Style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      disabled={isGenerating}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedStyle === style.id
                          ? 'border-primary bg-primary/10'
                          : 'border-romantic-200 hover:border-romantic-300'
                      }`}
                    >
                      <div className="font-semibold mb-1">{style.label}</div>
                      <div className="text-xs text-muted-foreground">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Romantic Art
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Heart className="h-6 w-6 text-romantic-600" />
            Your Gallery
          </h2>

          {isLoadingGallery ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            </div>
          ) : gallery.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No images yet. Generate your first romantic artwork above!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((image) => (
                <Card key={image.id} className="overflow-hidden group relative">
                  <div className="relative aspect-square">
                    <img
                      src={image.image_url}
                      alt={image.prompt}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-medium">
                      AI-Generated
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm line-clamp-2 mb-2">{image.prompt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-xs capitalize">{image.style}</span>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(image.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
