import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  onOpenCookiePreferences,
  saveConsent,
  useCookieConsent,
} from "@/lib/cookieConsent";

const CookieBanner = () => {
  const consent = useCookieConsent();
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [mapsEnabled, setMapsEnabled] = useState(false);

  const openPreferences = () => {
    setMapsEnabled(consent?.maps ?? false);
    setPreferencesOpen(true);
  };

  // Footer "Gérer les cookies" link opens the preferences from anywhere.
  useEffect(() => onOpenCookiePreferences(openPreferences));

  const choose = (maps: boolean) => {
    saveConsent({ maps });
    setPreferencesOpen(false);
  };

  return (
    <>
      {consent === null && !preferencesOpen && (
        <div
          role="region"
          aria-label="Gestion des cookies"
          className="fixed inset-x-0 bottom-0 z-50 p-4 animate-fade-in-up"
        >
          <div className="container mx-auto max-w-4xl bg-card border border-border rounded-xl shadow-strong p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Notre site n'utilise aucun cookie de suivi. Seule la carte Google Maps
                  dépose des cookies tiers et transmet votre adresse IP à Google : elle ne
                  s'affiche qu'avec votre accord.{" "}
                  <Link to="/confidentialite" className="text-primary underline underline-offset-2">
                    En savoir plus
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                <Button variant="outline" onClick={() => choose(false)}>
                  Refuser
                </Button>
                <Button variant="ghost" onClick={openPreferences}>
                  Personnaliser
                </Button>
                <Button onClick={() => choose(true)}>Accepter</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Paramètres des cookies</DialogTitle>
            <DialogDescription>
              Choisissez les services que vous autorisez. Vous pouvez modifier votre choix à
              tout moment via le lien « Gérer les cookies » en bas de page.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
              <div className="space-y-1">
                <Label htmlFor="cookies-necessary" className="font-semibold">
                  Strictement nécessaires
                </Label>
                <p className="text-sm text-muted-foreground">
                  Mémorisent votre choix de cookies dans votre navigateur. Aucune donnée
                  n'est transmise.
                </p>
              </div>
              <Switch id="cookies-necessary" checked disabled aria-readonly />
            </div>

            <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
              <div className="space-y-1">
                <Label htmlFor="cookies-maps" className="font-semibold">
                  Google Maps
                </Label>
                <p className="text-sm text-muted-foreground">
                  Affiche la carte interactive de notre adresse. Google peut déposer des
                  cookies et collecter votre adresse IP (Google Ireland Ltd / Google LLC).
                </p>
              </div>
              <Switch
                id="cookies-maps"
                checked={mapsEnabled}
                onCheckedChange={setMapsEnabled}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => choose(false)}>
              Tout refuser
            </Button>
            <Button variant="secondary" onClick={() => choose(mapsEnabled)}>
              Enregistrer
            </Button>
            <Button onClick={() => choose(true)}>Tout accepter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;
