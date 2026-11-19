import { IMG } from './images'
export const CATEGORIES = [
  { id: 'skincare', name: 'Soins visage', image: IMG.cat_skin, blurb: 'Sérums, crèmes et nettoyants' },
  { id: 'makeup', name: 'Maquillage', image: IMG.cat_makeup, blurb: 'Teints et lèvres velours' },
  { id: 'haircare', name: 'Cheveux', image: IMG.cat_hair, blurb: 'Rituels botaniques' },
  { id: 'bodycare', name: 'Corps', image: IMG.cat_body, blurb: 'Laits et huiles soyeux' },
  { id: 'suncare', name: 'Solaire', image: IMG.cat_sun, blurb: 'Protection minérale SPF 50' },
  { id: 'gifts', name: 'Coffrets', image: IMG.cat_gift, blurb: 'Idées cadeaux' },
]
const P = (id, name, category, price, old, img, rating, reviews, stock, desc, shades, badge) =>
  ({ id, name, category, price, old, img, rating, reviews, stock, desc, shades, badge, ingredients: 'Aqua, Glycerin, Niacinamide, Rosa Damascena Extract, Squalane, Panthenol, Tocopherol.' })
export const PRODUCTS = [
  P('p1', 'Sérum Niacinamide 10%', 'skincare', 249, 320, IMG.serum, 4.8, 200, 42, 'Sérum éclat qui affine le grain de peau et unifie le teint, enrichi à l’eau de rose de Damas.', ['30 ml', '50 ml'], 'Best-seller'),
  P('p2', 'Nettoyant Doux Nuage', 'skincare', 169, 0, IMG.cleanser, 4.7, 125, 60, 'Mousse amino-acide ultra douce, sans sulfates, pour une peau nette et confortable.', ['100 ml', '200 ml']),
  P('p3', 'Crème Gel Hydra Intense', 'skincare', 289, 349, IMG.cream, 4.9, 165, 8, 'Gel-crème aux peptides pour 72 h d’hydratation rebondie, fini satiné.', ['50 ml'], '-17%'),
  P('p4', 'Huile Botanique Réparatrice', 'skincare', 329, 0, IMG.oil, 4.6, 74, 25, 'Huile sèche au squalane d’olive et camomille pour nourrir sans alourdir.', ['30 ml']),
  P('p5', 'Crème Solaire Minérale SPF 50', 'suncare', 199, 0, IMG.spf, 4.5, 98, 0, 'Filtres minéraux invisibles, résistante à l’eau, idéale pour le climat marocain.', ['50 ml', '100 ml']),
  P('p6', 'Rouge Velours Mat', 'makeup', 149, 0, IMG.lip, 4.7, 91, 33, 'Rouge à lèvres mat confortable, pigments riches, finition velours.', ['Dahlia 04', 'Rose Poudré', 'Baie Intense'], 'Nouveau'),
  P('p7', 'Masque Gelée Rose', 'skincare', 219, 0, IMG.mask, 4.4, 56, 19, 'Masque gelée repulpant à appliquer 10 minutes pour un teint frais et lumineux.', ['75 ml']),
  P('p8', 'Contour Yeux Roll-On', 'skincare', 259, 289, IMG.eye, 4.6, 44, 14, 'Applicateur rollerball rafraîchissant qui défatigue le regard.', ['15 ml']),
  P('p9', 'Gua Sha Quartz Rose', 'gifts', 179, 0, IMG.gua, 4.9, 210, 27, 'Gua sha sculpté dans un vrai quartz rose pour un massage drainant.', ['Cœur', 'Classique']),
  P('p10', 'Teinte Minérale Satin', 'makeup', 189, 0, IMG.tint, 4.5, 63, 21, 'Teinte légère modulable pour lèvres et joues, effet bonne mine.', ['Dahlia 04', 'Pivoine 02']),
  P('p11', 'Lait Corps Éclat', 'bodycare', 159, 199, IMG.promo, 4.6, 87, 38, 'Lait corps à la vitamine C et au karité pour une peau lumineuse.', ['250 ml', '400 ml']),
  P('p12', 'Coffret Découverte Rose', 'gifts', 449, 560, IMG.cat_gift, 4.9, 132, 12, 'Coffret de 5 miniatures best-sellers dans un écrin blush.', ['Unique'], 'Coffret'),
]
export const ORDERS = [
  { id: 'DP-10482', customer: 'Salma Benali', email: 'salma@mail.ma', date: '2026-11-08', total: 538, status: 'Livrée', items: 3, city: 'Casablanca' },
  { id: 'DP-10475', customer: 'Yasmine El Fassi', email: 'yasmine@mail.ma', date: '2026-11-06', total: 289, status: 'Expédiée', items: 1, city: 'Rabat' },
  { id: 'DP-10461', customer: 'Imane Alaoui', email: 'imane@mail.ma', date: '2026-11-04', total: 727, status: 'En préparation', items: 4, city: 'Marrakech' },
  { id: 'DP-10450', customer: 'Nour Chraibi', email: 'nour@mail.ma', date: '2026-11-02', total: 169, status: 'Annulée', items: 1, city: 'Tanger' },
  { id: 'DP-10441', customer: 'Salma Benali', email: 'salma@mail.ma', date: '2026-10-28', total: 448, status: 'Livrée', items: 2, city: 'Casablanca' },
]
export const CUSTOMERS = [
  { id: 'c1', name: 'Salma Benali', email: 'salma@mail.ma', city: 'Casablanca', orders: 7, spent: 3120 },
  { id: 'c2', name: 'Yasmine El Fassi', email: 'yasmine@mail.ma', city: 'Rabat', orders: 3, spent: 1180 },
  { id: 'c3', name: 'Imane Alaoui', email: 'imane@mail.ma', city: 'Marrakech', orders: 5, spent: 2240 },
  { id: 'c4', name: 'Nour Chraibi', email: 'nour@mail.ma', city: 'Tanger', orders: 1, spent: 169 },
]
export const COUPON_SEED = [
  { id: 'cp1', code: 'GLOW15', discount: 15, active: 'Oui', uses: 128 },
  { id: 'cp2', code: 'DUNI10', discount: 10, active: 'Oui', uses: 64 },
]
export const REVIEW_SEED = [
  { id: 'r1', product: 'Sérum Niacinamide 10%', author: 'Salma B.', rating: 5, text: 'Ma peau est transformée, texture divine.', status: 'Publié' },
  { id: 'r2', product: 'Crème Gel Hydra Intense', author: 'Imane A.', rating: 4, text: 'Très hydratante, j’adore le pot.', status: 'En attente' },
  { id: 'r3', product: 'Rouge Velours Mat', author: 'Nour C.', rating: 3, text: 'Belle couleur mais tenue moyenne.', status: 'En attente' },
]
export const POSTS = [
  { id: 'j1', title: 'Le rituel de la rose de Damas', tag: 'Ingrédients', img: IMG.j1, text: 'Cueillie à l’aube, la rose de Damas concentre des polyphénols apaisants. Découvrez comment nous la distillons à froid pour préserver son parfum et ses bienfaits.' },
  { id: 'j2', title: 'Routine matin & soir : le rythme circadien', tag: 'Routines', img: IMG.j2, text: 'Le matin protège, le soir répare. Voici comment construire une routine en 4 étapes adaptée au climat marocain.' },
  { id: 'j3', title: 'Tremella vs acide hyaluronique', tag: 'Science', img: IMG.j3, text: 'Deux humectants, deux textures. Nous comparons leur capacité de rétention d’eau et leurs usages idéaux.' },
  { id: 'j4', title: 'Récolte durable dans les Alpes maritimes', tag: 'Engagements', img: IMG.j4, text: 'Notre charte de cueillette respectueuse préserve la biodiversité et soutient les producteurs locaux.' },
]
export const FAQS = [
  ['Quels sont les délais de livraison au Maroc ?', 'Casablanca et Rabat : 24 à 48 h. Autres villes : 2 à 4 jours ouvrés. Livraison offerte dès 500 DH.'],
  ['Puis-je payer à la livraison ?', 'Oui, le paiement à la livraison est disponible partout au Maroc, ainsi que le paiement par carte.'],
  ['Comment retourner un produit ?', 'Vous disposez de 15 jours pour retourner un produit non ouvert. Contactez-nous pour une étiquette de retour.'],
  ['Vos produits sont-ils testés sur les animaux ?', 'Jamais. DuniPretty est 100 % cruelty-free et propose des formules propres et dermatologiquement testées.'],
  ['Comment utiliser un code promo ?', 'Saisissez votre code (ex. GLOW15) dans le panier ou à l’étape de paiement.'],
]
