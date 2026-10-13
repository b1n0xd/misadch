import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

// ============================================================
// CONFIGURATION — Set your Google Place ID and API Key
// ============================================================
// 1. Find your Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id
// 2. Get an API Key: https://console.cloud.google.com/apis/credentials
// 3. Enable "Places API (New)" in Google Cloud Console
// 4. Create a .env file in the project root with:
//      VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
//      VITE_GOOGLE_PLACE_ID=your_place_id_here
//
// MISAD Place ID (hardcoded for review links)
const PLACE_ID = "ChIJiX6S-j1ljEcRfONT51j1aXU";
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=";
// ============================================================

interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time: number;
}

interface PlaceResult {
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
}

// Real Google reviews (copied from Google Maps), shown when the API is not configured.
// Rating and total come from the Google Business profile — update them when new reviews arrive.
// `time` is approximate (Google only shows "il y a X mois").
const GOOGLE_RATING = 5.0;
const GOOGLE_TOTAL_REVIEWS = 14;

const staticReviews: GoogleReview[] = [
  {
    author_name: "Craquette",
    rating: 5,
    text: "Nous avons découvert cette équipe FORMIDABLE grâce à notre médecin de famille. C'est une petite structure très professionnelle et même temps on dirait une jolie famille qui s'occupe avec bienveillance des personnes en difficultés. Quel soulagement depuis que nous sommes avec eux.",
    time: Date.parse("2026-04-10") / 1000,
  },
  {
    author_name: "Fred FANCELLO",
    rating: 5,
    text: "Un immense merci à Miguel et à toute l’équipe de MISAD pour leur accompagnement exceptionnel. Vous avez fait preuve d’un professionnalisme irréprochable, mais surtout d’une grande humanité, de patience et de gentillesse dans l’accompagnement de mes parents. Votre soutien a été constant et précieux jusqu’à l’entrée de mon papa, âgé de 85 ans, en EMS en ce début d’année. Dans une période délicate pour toute une famille, pouvoir compter sur une équipe aussi engagée, bienveillante et fiable fait toute la différence. Vous avez été formidables du début à la fin. Je recommande MISAD sans la moindre hésitation.",
    time: Date.parse("2026-02-10") / 1000,
  },
  {
    author_name: "Moussa MARIKO",
    rating: 5,
    text: "Une équipe professionnelle et incroyablement réactive. On sent surtout qu’ils respectent profondément leurs patients. Toujours ponctuels, toujours souriants, toujours prêts à expliquer, rassurer et accompagner — leur présence transforme une situation parfois difficile en un moment de confiance et de sérénité. Un immense merci pour leur dévouement. Si vous cherchez des infirmiers à domicile vraiment qualifiés et bienveillants, vous êtes au bon endroit.",
    time: Date.parse("2025-12-10") / 1000,
  },
  {
    author_name: "Katrin Wenninger",
    rating: 5,
    text: "Un immense merci à cette formidable équipe, tant pour son professionnalisme que pour son empathie et son engagement sans faille. 5 étoiles? non, plus! 6 étoiles. Avec toute notre reconnaissance+++",
    time: Date.parse("2026-02-10") / 1000,
  },
  {
    author_name: "Jessica U.",
    rating: 5,
    text: "Je tiens à exprimer toute ma gratitude pour MISAD mais surtout pour Miguel qui est un infirmier exceptionnel, dont le professionnalisme et la gentillesse font toute la différence. Ses compétences médicales sont remarquables, et il sait toujours mettre ses patients à l'aise avec son approche humaine et bienveillante. Je recommande vivement MISAD à tous ceux qui recherchent un service de soins à domicile de haute qualité.",
    time: Date.parse("2024-10-10") / 1000,
  },
];

const relativeTimeFormat = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

const formatRelativeTime = (time: number) => {
  const days = Math.round((time * 1000 - Date.now()) / 86_400_000);
  if (Math.abs(days) < 30) return relativeTimeFormat.format(days, "day");
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return relativeTimeFormat.format(months, "month");
  return relativeTimeFormat.format(Math.round(days / 365), "year");
};

const TRUNCATE_AT = 200;

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [placeRating, setPlaceRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY || "";
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || PLACE_ID;

  const applyStaticReviews = () => {
    setReviews(staticReviews);
    setPlaceRating(GOOGLE_RATING);
    setTotalReviews(GOOGLE_TOTAL_REVIEWS);
  };

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      if (!apiKey || !placeId) {
        // No API key configured, use static real reviews
        applyStaticReviews();
        setLoading(false);
        return;
      }

      try {
        // Use the Google Places API (proxy through Vite dev server or direct in production)
        const response = await fetch(
          `/api/google-reviews?place_id=${placeId}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data: { result: PlaceResult } = await response.json();
        const place = data.result;

        if (place.reviews && place.reviews.length > 0) {
          // Sort by most recent and take top reviews
          const sortedReviews = place.reviews
            .sort((a, b) => b.time - a.time)
            .slice(0, 6);
          
          setReviews(sortedReviews);
          setPlaceRating(place.rating || null);
          setTotalReviews(place.user_ratings_total || null);
        } else {
          applyStaticReviews();
        }
      } catch (error) {
        console.warn("Could not fetch Google reviews, using static reviews:", error);
        applyStaticReviews();
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, [apiKey, placeId]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : star - 0.5 <= rating
                ? "text-yellow-400 fill-yellow-400/50"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Avis de nos patients
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none shadow-soft bg-card animate-pulse">
                <CardContent className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-24" />
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-12 h-12 rounded-full bg-muted" />
                    <div className="space-y-1">
                      <div className="h-3 bg-muted rounded w-24" />
                      <div className="h-2 bg-muted rounded w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Header with Google Rating */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Avis de nos patients
          </h2>
          
          {/* Google Rating Summary */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              {/* Google "G" logo */}
              <svg className="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              
              {placeRating && (
                <span className="text-2xl font-bold text-foreground">
                  {placeRating.toFixed(1)}
                </span>
              )}
              
              {placeRating && renderStars(placeRating)}
            </div>
            
            {totalReviews && (
              <span className="text-muted-foreground">
                ({totalReviews} avis)
              </span>
            )}
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Avis vérifiés de nos patients sur Google
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="border-none shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2 bg-card animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Stars */}
                <div className="flex items-center justify-between">
                  {renderStars(review.rating)}
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(review.time)}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed text-sm min-h-[4.5rem]">
                  "{review.text.length > TRUNCATE_AT && !expanded.has(index)
                    ? review.text.slice(0, TRUNCATE_AT).trimEnd() + "..."
                    : review.text}"
                  {review.text.length > TRUNCATE_AT && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(index)}
                      className="ml-1 text-primary hover:text-primary-hover font-medium"
                    >
                      {expanded.has(index) ? "Réduire" : "Lire plus"}
                    </button>
                  )}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  {review.profile_photo_url ? (
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {getInitials(review.author_name)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {review.author_name}
                    </p>
                    <div className="flex items-center gap-1">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="text-xs text-muted-foreground">
                        Avis Google
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA — Leave a review / See all reviews */}
        {placeId && (
          <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://search.google.com/local/reviews?placeid=${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-all duration-300 hover:translate-x-1"
            >
              Voir tous les avis Google
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={`${GOOGLE_REVIEW_URL}${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-2.5 rounded-lg font-medium shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-strong"
            >
              Laisser un avis
              <Star className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
