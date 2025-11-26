import { QuoteForm } from "@/components/QuoteForm";
import { Helmet } from "react-helmet";

export default function Quote() {
  return (
    <>
      <Helmet>
        <title>Get a Quote - Choice Café</title>
        <meta
          name="description"
          content="Request a customized quote for our catering and event services. Fill out our simple form and we'll get back to you promptly."
        />
      </Helmet>
      
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Request Your Custom Quote
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your event details with us and our team will provide you with a personalized
              quote tailored to your specific needs and budget.
            </p>
          </div>
          
          <QuoteForm />
        </div>
      </div>
    </>
  );
}
