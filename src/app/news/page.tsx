import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function NewsPage() {
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
              News & Highlights
            </h1>
            <p className="text-subtitle max-w-2xl mx-auto">
              Post-event highlights and market insights from our private auctions
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <article className="bg-background rounded-lg overflow-hidden border border-border/20 luxury-hover">
              <div className="p-6">
                <div className="flex items-center gap-2 text-caption mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>December 2024</span>
                </div>
                <h3 className="font-display text-2xl mb-4">
                  Q4 Auction Results
                </h3>
                <p className="text-muted-foreground font-body mb-6">
                  Strong performance across European sports cars with notable 
                  interest from international collectors.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>85% sell-through rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% avg. premium</span>
                  </div>
                </div>
              </div>
            </article>

            {/* News Item 2 */}
            <article className="bg-background rounded-lg overflow-hidden border border-border/20 luxury-hover">
              <div className="p-6">
                <div className="flex items-center gap-2 text-caption mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>November 2024</span>
                </div>
                <h3 className="font-display text-2xl mb-4">
                  Asian Market Expansion
                </h3>
                <p className="text-muted-foreground font-body mb-6">
                  Growing interest from Southeast Asian collectors, particularly 
                  in Japanese and German performance vehicles.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Regional focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+18% participation</span>
                  </div>
                </div>
              </div>
            </article>

            {/* News Item 3 */}
            <article className="bg-background rounded-lg overflow-hidden border border-border/20 luxury-hover">
              <div className="p-6">
                <div className="flex items-center gap-2 text-caption mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>October 2024</span>
                </div>
                <h3 className="font-display text-2xl mb-4">
                  Classic Car Revival
                </h3>
                <p className="text-muted-foreground font-body mb-6">
                  Exceptional results for 1960s and 1970s classics, with 
                  restored examples achieving record premiums.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>92% sell-through rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+25% avg. premium</span>
                  </div>
                </div>
              </div>
            </article>

            {/* News Item 4 */}
            <article className="bg-background rounded-lg overflow-hidden border border-border/20 luxury-hover">
              <div className="p-6">
                <div className="flex items-center gap-2 text-caption mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>September 2024</span>
                </div>
                <h3 className="font-display text-2xl mb-4">
                  Supercar Segment
                </h3>
                <p className="text-muted-foreground font-body mb-6">
                  Modern supercars continue to attract strong bidding, with 
                  limited production models leading the market.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Global interest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+15% avg. premium</span>
                  </div>
                </div>
              </div>
            </article>

            {/* News Item 5 */}
            <article className="bg-background rounded-lg overflow-hidden border border-border/20 luxury-hover">
              <div className="p-6">
                <div className="flex items-center gap-2 text-caption mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>August 2024</span>
                </div>
                <h3 className="font-display text-2xl mb-4">
                  Provenance Focus
                </h3>
                <p className="text-muted-foreground font-body mb-6">
                  Vehicles with documented celebrity ownership or racing history 
                  achieving exceptional results.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>88% sell-through rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+22% avg. premium</span>
                  </div>
                </div>
              </div>
            </article>

            {/* News Item 6 */}
            <article className="bg-background rounded-lg overflow-hidden border border-border/20 luxury-hover">
              <div className="p-6">
                <div className="flex items-center gap-2 text-caption mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>July 2024</span>
                </div>
                <h3 className="font-display text-2xl mb-4">
                  Market Insights
                </h3>
                <p className="text-muted-foreground font-body mb-6">
                  Analysis of emerging trends in collector car preferences 
                  and investment patterns.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Research report</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Market analysis</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Stay Informed
          </h2>
          <p className="text-subtitle mb-8 max-w-2xl mx-auto">
            Access detailed market reports and auction insights with 
            your private membership.
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
