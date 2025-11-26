import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function QuoteForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    message: "",
    budget: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.service_type) {
      newErrors.service_type = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: quoteData, error } = await supabase.from("quotes").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service_type: formData.service_type,
          message: formData.message.trim(),
          budget: formData.budget.trim() || null,
        },
      ]).select().single();

      if (error) throw error;

      // Send email notification (non-blocking)
      try {
        await supabase.functions.invoke("send-quote-email", {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            service_type: formData.service_type,
            message: formData.message.trim(),
            budget: formData.budget.trim() || null,
            created_at: quoteData.created_at,
          },
        });
      } catch (emailError) {
        // Log error but don't interrupt user flow
        console.error("Failed to send email notification:", emailError);
      }

      toast({
        title: "Quote Submitted!",
        description: "We'll get back to you soon with a customized quote.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        service_type: "",
        message: "",
        budget: "",
      });
      setErrors({});
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Get Your Quote</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you with a customized quote.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_type">Service Type *</Label>
            <Select
              value={formData.service_type}
              onValueChange={(value) => handleChange("service_type", value)}
            >
              <SelectTrigger className={errors.service_type ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corporate-catering">Corporate Catering</SelectItem>
                <SelectItem value="social-events">Social Events</SelectItem>
                <SelectItem value="cafe-services">Café Services</SelectItem>
                <SelectItem value="staff-management">Staff Management</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.service_type && (
              <p className="text-sm text-destructive">{errors.service_type}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Description / Message *</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your event or service needs..."
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={errors.message ? "border-destructive" : ""}
              rows={5}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (Optional)</Label>
            <Input
              id="budget"
              placeholder="e.g., KSh 5,000 - KSh 10,000"
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Get Your Quote"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
