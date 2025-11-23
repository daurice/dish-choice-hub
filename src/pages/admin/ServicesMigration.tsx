import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import corporateCateringImg from "@/assets/corporate-catering.jpg";
import staffManagementImg from "@/assets/staff_management.jpg";
import socialEventsImg from "@/assets/social-events.jpg";
import cafeImg from "@/assets/cafe.jpg";

const servicesToMigrate = [
  {
    title: "Corporate Catering",
    description: "Professional catering solutions for meetings, conferences, and corporate events",
    icon: "Briefcase",
    image: corporateCateringImg,
    order_index: 1,
  },
  {
    title: "Staff Management",
    description: "Comprehensive kitchen and staff management services for your catering needs",
    icon: "Users",
    image: staffManagementImg,
    order_index: 2,
  },
  {
    title: "Social Events",
    description: "Memorable catering for weddings, parties, and special celebrations",
    icon: "PartyPopper",
    image: socialEventsImg,
    order_index: 3,
  },
  {
    title: "Cafe Services",
    description: "Premium cafe management and catering solutions for your business",
    icon: "Coffee",
    image: cafeImg,
    order_index: 4,
  },
];

export default function ServicesMigration() {
  const [migrating, setMigrating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const urlToBlob = async (url: string): Promise<Blob> => {
    const response = await fetch(url);
    return await response.blob();
  };

  const migrateServices = async () => {
    setMigrating(true);
    setProgress(0);

    try {
      for (let i = 0; i < servicesToMigrate.length; i++) {
        const service = servicesToMigrate[i];
        
        // Convert image to blob
        const imageBlob = await urlToBlob(service.image);
        
        // Generate filename
        const fileExt = imageBlob.type.split("/")[1];
        const fileName = `${service.title.toLowerCase().replace(/\s+/g, "-")}.${fileExt}`;
        
        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from("service-images")
          .upload(fileName, imageBlob, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("service-images")
          .getPublicUrl(fileName);

        // Check if service exists
        const { data: existing } = await supabase
          .from("services")
          .select("id")
          .eq("title", service.title)
          .single();

        if (existing) {
          // Update existing
          const { error: updateError } = await supabase
            .from("services")
            .update({
              description: service.description,
              icon: service.icon,
              image_path: publicUrl,
              order_index: service.order_index,
            })
            .eq("id", existing.id);

          if (updateError) throw updateError;
        } else {
          // Insert new
          const { error: insertError } = await supabase
            .from("services")
            .insert({
              title: service.title,
              description: service.description,
              icon: service.icon,
              image_path: publicUrl,
              order_index: service.order_index,
            });

          if (insertError) throw insertError;
        }

        setProgress(((i + 1) / servicesToMigrate.length) * 100);
      }

      toast.success("Services migrated successfully!");
      setCompleted(true);
    } catch (error) {
      console.error("Migration error:", error);
      toast.error("Failed to migrate services");
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Migrate Services to Storage</CardTitle>
          <CardDescription>
            This will migrate all service images from local assets to the service-images storage bucket
            and update the database records.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!completed ? (
            <>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Services to migrate: {servicesToMigrate.length}
                </p>
                {migrating && (
                  <div className="space-y-2">
                    <Progress value={progress} />
                    <p className="text-sm text-center">{Math.round(progress)}%</p>
                  </div>
                )}
              </div>

              <Button
                onClick={migrateServices}
                disabled={migrating}
                className="w-full"
                size="lg"
              >
                {migrating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Migrating Services...
                  </>
                ) : (
                  "Start Migration"
                )}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-semibold">Migration Complete!</h3>
              <p className="text-muted-foreground text-center">
                All services have been successfully migrated to storage.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
