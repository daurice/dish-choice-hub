import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, CheckCircle } from "lucide-react";
import image1 from "@/assets/image 1.jpg";
import image2 from "@/assets/image 2.jpg";
import image3 from "@/assets/image 3.jpg";
import image4 from "@/assets/image 4.jpg";
import image5 from "@/assets/image 5.jpg";
import image6 from "@/assets/image 6.jpg";
import image7 from "@/assets/image 7.jpg";
import image8 from "@/assets/image 8.jpg";
import image9 from "@/assets/image 9.jpg";
import image10 from "@/assets/image 10.jpg";
import image11 from "@/assets/image 11.jpg";
import image12 from "@/assets/image 12.jpg";
import image13 from "@/assets/image 13.jpg";
import image14 from "@/assets/image 14.jpg";
import image15 from "@/assets/image 15.jpg";
import image16 from "@/assets/image 16.jpg";
import image17 from "@/assets/image 17.jpg";

const galleryData = [
  { image: image1, title: "Event Setup", description: "Professional catering setup", order: 1 },
  { image: image2, title: "Delicious Spread", description: "Fresh and appetizing dishes", order: 2 },
  { image: image3, title: "Elegant Presentation", description: "Beautifully arranged platters", order: 3 },
  { image: image4, title: "Corporate Event", description: "Business lunch catering", order: 4 },
  { image: image5, title: "Wedding Catering", description: "Special occasion dining", order: 5 },
  { image: image6, title: "Buffet Style", description: "Self-service options", order: 6 },
  { image: image7, title: "Fine Dining", description: "Premium meal service", order: 7 },
  { image: image8, title: "Party Catering", description: "Social gatherings", order: 8 },
  { image: image9, title: "Outdoor Events", description: "Al fresco dining", order: 9 },
  { image: image10, title: "Themed Events", description: "Custom event styling", order: 10 },
  { image: image11, title: "Dessert Table", description: "Sweet treats display", order: 11 },
  { image: image12, title: "Cocktail Party", description: "Appetizers and drinks", order: 12 },
  { image: image13, title: "Formal Dinner", description: "Seated meal service", order: 13 },
  { image: image14, title: "Brunch Catering", description: "Morning events", order: 14 },
  { image: image15, title: "BBQ Events", description: "Grilled specialties", order: 15 },
  { image: image16, title: "International Cuisine", description: "Global flavors", order: 16 },
  { image: image17, title: "Seasonal Menu", description: "Fresh seasonal ingredients", order: 17 },
];

export default function GalleryMigration() {
  const [migrating, setMigrating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const urlToBlob = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    return await response.blob();
  };

  const migrateImages = async () => {
    setMigrating(true);
    setProgress(0);

    try {
      for (let i = 0; i < galleryData.length; i++) {
        const item = galleryData[i];
        
        // Convert imported image to blob
        const blob = await urlToBlob(item.image);
        const fileName = `gallery-${item.order}.jpg`;
        const filePath = `gallery/${fileName}`;

        // Upload to storage bucket
        const { error: uploadError } = await supabase.storage
          .from("website-images")
          .upload(filePath, blob, {
            contentType: "image/jpeg",
            upsert: true
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("website-images")
          .getPublicUrl(filePath);

        // Insert into database
        const { error: dbError } = await supabase
          .from("gallery_images")
          .insert({
            title: item.title,
            description: item.description,
            image_path: publicUrl,
            order_index: item.order
          });

        if (dbError) throw dbError;

        setProgress(Math.round(((i + 1) / galleryData.length) * 100));
      }

      setCompleted(true);
      toast.success("All gallery images migrated successfully!");
    } catch (error: any) {
      toast.error("Migration failed: " + error.message);
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-card rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Gallery Migration Utility</h1>
        <p className="text-muted-foreground mb-6">
          This will upload all 17 gallery images from assets to the storage bucket
          and populate the gallery_images table.
        </p>

        {!completed ? (
          <>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded">
                <p className="text-sm font-medium mb-2">Migration Steps:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Upload images to website-images bucket</li>
                  <li>Store public URLs in gallery_images table</li>
                  <li>Enable admin CRUD operations</li>
                </ul>
              </div>

              {migrating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Migrating images...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={migrateImages}
                disabled={migrating}
                className="w-full"
                size="lg"
              >
                {migrating ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-pulse" />
                    Migrating... {progress}%
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Start Migration
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Migration Complete!</h2>
            <p className="text-muted-foreground mb-4">
              All 17 images have been uploaded to the storage bucket and added to the database.
            </p>
            <Button onClick={() => window.location.href = '/admin/tables/gallery-images'}>
              Go to Gallery Management
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
