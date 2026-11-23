# Mise en ligne du site BDS Chauffage

Ce qu'il reste à faire pour passer de l'aperçu GitHub (`https://firenaik.github.io/BDS-Chauffage/`)
au site définitif hébergé chez OVHcloud. À cocher au fur et à mesure.

## 1. Informations à demander à BDS Chauffage

- [ ] Statut juridique : entrepreneur individuel ou micro-entreprise (nom suivi de « EI »), ou
      société (forme juridique et capital)
- [ ] Prénom et nom du dirigeant (directeur de la publication)
- [ ] Adresse du siège, ou adresse de domiciliation
- [ ] Numéro de téléphone professionnel
- [ ] Adresse e-mail professionnelle
- [ ] Numéro SIRET
- [ ] Numéro de TVA intracommunautaire, ou franchise de TVA (« TVA non applicable, article 293 B
      du CGI »)
- [ ] Assurance décennale : assureur, numéro de contrat, zone couverte
- [ ] Médiateur de la consommation (nom, adresse, site) : **obligatoire** pour travailler chez des
      particuliers, souvent proposé par la CMA ou une fédération du bâtiment
- [ ] Liens des pages Facebook et X, ou décision de retirer le bloc « Suivez-nous »
- [ ] Fin exacte de la citation « Une intervention rapide pour… » (coupée sur les captures)
- [ ] Logo en haute définition (SVG, ou PNG d'au moins 512 px)
- [ ] Photos d'origine, ou mieux, ses propres photos de chantier. Vérifier le droit d'utiliser
      les photos actuelles en dehors de Webador
- [ ] Liste des communes où il intervient (texte de la page et référencement)

## 2. Chez OVHcloud

- [ ] Acheter le nom de domaine (`.fr` ou `.com`)
- [ ] Souscrire un hébergement web
- [ ] Activer le certificat SSL gratuit (Let's Encrypt) dans l'espace client
- [ ] Choisir l'adresse officielle : avec ou sans `www`
- [ ] (Facultatif) Créer une adresse e-mail professionnelle sur le domaine

## 3. Dans le code

- [ ] **Retirer le `noindex`** en haut de `index.html` : le commentaire « À RETIRER » donne la ligne
      qui le remplace. Sans ça, Google ignore le site.
- [ ] Remplacer `https://firenaik.github.io/BDS-Chauffage/` par l'adresse définitive (par exemple
      `https://www.bdschauffage.fr/`) : 7 fois dans `index.html` (adresse canonique, aperçu des liens
      partagés, données Google), 1 fois dans `sitemap.xml`, 1 fois dans `robots.txt`
- [ ] Remplacer le faux numéro dans `index.html` :
  - `06 00 00 00 00`, le numéro affiché : 2 fois (bloc contact, mentions légales)
  - `+33600000000`, le numéro des liens d'appel : 4 fois (données Google, bouton « Urgence
    dépannage », bouton « Dépannage rapide », bloc contact)
- [ ] Mettre la vraie adresse du site dans le bloc contact (« BDSChauffage.com » aujourd'hui)
- [ ] Compléter les `[crochets]` des mentions légales, en bas de `index.html`. Garder la ligne
      « entrepreneur individuel (EI) » ou la remplacer par celle de la société
- [ ] Vérifier les coordonnées de l'hébergeur dans les mentions légales d'ovhcloud.com
- [ ] Liens Facebook et X (aujourd'hui `href="#"`), ou retirer le bloc « Suivez-nous »
- [ ] Fin de la citation
- [ ] Remplacer le logo et les photos dans `images/` (mêmes noms de fichiers) et refaire
      `images/favicon.png` en 96 × 96 px à partir du nouveau logo
- [ ] Mettre à jour la date `<lastmod>` de `sitemap.xml`
- [ ] Ajouter un fichier `.htaccess` : HTTPS forcé, une seule adresse (avec ou sans `www`),
      compression et cache des fichiers (à écrire une fois le domaine connu)
- [ ] Supprimer les commentaires « À COMPLÉTER » et « À RETIRER », puis lancer cette commande depuis
      le dossier du site. Elle ne doit plus rien afficher :

```bash
grep -nE 'À COMPLÉTER|À RETIRER|00 00 00 00|600000000|firenaik|href="#"|\[[[:alpha:]]' index.html sitemap.xml robots.txt
```

## 4. Envoi sur l'hébergement

- [ ] Envoyer en FTP (avec FileZilla par exemple) dans le dossier `www/` de l'hébergement :
      `index.html`, `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, `.htaccess`, et les
      dossiers `images/` et `fonts/`
- [ ] Ne pas envoyer `.git/`, `.gitignore` ni `MISE-EN-LIGNE.md`

## 5. Juste après la mise en ligne

- [ ] Tester sur téléphone et sur ordinateur : menu, défilement vers les sections, boutons
      d'appel, ouverture des mentions légales
- [ ] Vérifier les redirections : `http://` vers `https://`, et l'adresse non officielle (avec ou
      sans `www`) vers l'officielle
- [ ] Google Search Console : ajouter le domaine (enregistrement TXT dans la zone DNS chez OVH),
      envoyer `sitemap.xml` et demander l'indexation de la page
- [ ] Passer la page au test des résultats enrichis de Google (données de l'entreprise) et à
      PageSpeed Insights (vitesse)
- [ ] Créer la fiche Google Business Profile avec le lien du site, et garder exactement le même
      nom, la même adresse et le même téléphone partout
- [ ] Désactiver GitHub Pages (dépôt GitHub → Settings → Pages) ou repasser le dépôt en privé,
      pour qu'il ne reste qu'une seule version du site en ligne

## 6. Pour aller plus loin

- [ ] Enrichir le texte : communes desservies, quelques lignes de plus par prestation
- [ ] Demander des avis clients sur la fiche Google
- [ ] (Facultatif) Bing Webmaster Tools, en important le site depuis Search Console
