import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Award, Eye } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="font-display text-5xl md:text-6xl mb-6">
              About REVURA
            </h1>
          </div>
          
          <div className="space-y-8 text-left max-w-3xl mx-auto">
            <p className="text-subtitle leading-relaxed">
              REVURA represents the pinnacle of automotive curation, where every vehicle
              is selected for its exceptional provenance, mechanical integrity, and historical
              significance. Our team of specialists conducts exhaustive research, ensuring
              each lot meets museum-grade standards before entering our private catalog.
            </p>
            
            <p className="text-subtitle leading-relaxed">
              Discretion is fundamental to our philosophy. We operate with the utmost 
              confidentiality, protecting the privacy of both buyers and sellers while 
              maintaining the highest standards of authentication and verification. 
              Every transaction is conducted with the precision and care befitting 
              the world's most exclusive automotive collections.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl mb-4">Craft</h3>
              <p className="text-muted-foreground font-body">
                Uncompromising attention to mechanical excellence and restoration quality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl mb-4">Provenance</h3>
              <p className="text-muted-foreground font-body">
                Documented history and verified authenticity for every vehicle.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl mb-4">Discretion</h3>
              <p className="text-muted-foreground font-body">
                Complete privacy and confidentiality in all transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Join the Collection
          </h2>
          <p className="text-subtitle mb-8 max-w-2xl mx-auto">
            Apply for membership to access our private catalog and participate 
            in exclusive auctions.
          </p>
          <Button className="btn-luxury">
            Request Access
            <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </Button>
        </div>
      </section>
    </div>
  );
}
