import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  budget: string | null;
  created_at: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service_type, message, budget, created_at }: QuoteEmailRequest = await req.json();

    console.log("Sending quote email notification:", { name, email, service_type });

    const emailResponse = await resend.emails.send({
      from: "The Choice Cafe <no-reply@thechoicecafe.com>",
      to: ["vintab@thechoicecafe.com"],
      subject: "New Quote Request Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
            New Quote Request Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Customer Information</h3>
            
            <p style="margin: 10px 0;">
              <strong>Full Name:</strong><br/>
              ${name}
            </p>
            
            <p style="margin: 10px 0;">
              <strong>Email:</strong><br/>
              <a href="mailto:${email}" style="color: #0066cc;">${email}</a>
            </p>
            
            <p style="margin: 10px 0;">
              <strong>Phone:</strong><br/>
              ${phone}
            </p>
            
            <p style="margin: 10px 0;">
              <strong>Service Type:</strong><br/>
              ${service_type}
            </p>
            
            <p style="margin: 10px 0;">
              <strong>Budget:</strong><br/>
              ${budget || "Not specified"}
            </p>
            
            <p style="margin: 10px 0;">
              <strong>Message:</strong><br/>
              <div style="white-space: pre-wrap; background-color: white; padding: 15px; border-left: 3px solid #0066cc; margin-top: 5px;">
                ${message}
              </div>
            </p>
            
            <p style="margin: 10px 0; color: #666; font-size: 0.9em;">
              <strong>Submitted at:</strong><br/>
              ${new Date(created_at).toLocaleString()}
            </p>
          </div>
          
          <p style="color: #666; font-size: 0.85em; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
            This is an automated notification from The Choice Cafe quote request system.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
