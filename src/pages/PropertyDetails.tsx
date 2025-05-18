import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Building2, MapPin, BedDouble, Bath, Square, Clock, Share2, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { properties } from '@/data/properties';
import { formatCurrency } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const property = properties.find(p => p.id === id);
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Imóvel não encontrado</h1>
            <p className="text-gray-500 mb-6">O imóvel que você está procurando não está disponível.</p>
            <Link to="/">
              <Button>Voltar para a página inicial</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleContact = () => {
    toast({
      title: "Mensagem enviada!",
      description: `Você entrou em contato com ${property.seller.name} sobre o imóvel "${property.title}".`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-realestate-primary">Início</Link>
            <span>/</span>
            <Link to={property.type === 'rent' ? "/alugar" : "/comprar"} className="hover:text-realestate-primary">
              {property.type === 'rent' ? 'Alugar' : 'Comprar'}
            </Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">{property.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <p className="text-lg text-gray-500 mb-4 flex items-center">
                <MapPin size={18} className="mr-1" />
                {property.location}
              </p>

              {/* Image gallery */}
              <Carousel className="w-full max-w-4xl mb-8">
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img src={image} alt={`${property.title} - Image ${index + 1}`} className="w-full rounded-lg h-[400px] object-cover" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              {/* Property details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col items-center justify-center py-4 px-2 border rounded-lg bg-realestate-muted">
                  <BedDouble size={24} className="mb-2 text-realestate-primary" />
                  <span className="text-lg font-medium">{property.bedrooms}</span>
                  <span className="text-sm text-gray-500">{property.bedrooms === 1 ? 'Quarto' : 'Quartos'}</span>
                </div>
                <div className="flex flex-col items-center justify-center py-4 px-2 border rounded-lg bg-realestate-muted">
                  <Bath size={24} className="mb-2 text-realestate-primary" />
                  <span className="text-lg font-medium">{property.bathrooms}</span>
                  <span className="text-sm text-gray-500">{property.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}</span>
                </div>
                <div className="flex flex-col items-center justify-center py-4 px-2 border rounded-lg bg-realestate-muted">
                  <Building2 size={24} className="mb-2 text-realestate-primary" />
                  <span className="text-lg font-medium">{property.area}</span>
                  <span className="text-sm text-gray-500">m²</span>
                </div>
                <div className="flex flex-col items-center justify-center py-4 px-2 border rounded-lg bg-realestate-muted">
                  <Clock size={24} className="mb-2 text-realestate-primary" />
                  <span className="text-lg font-medium">Novo</span>
                  <span className="text-sm text-gray-500">Anúncio</span>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="description" className="mb-8">
                <TabsList>
                  <TabsTrigger value="description">Descrição</TabsTrigger>
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="location">Localização</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-4">
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </TabsContent>
                <TabsContent value="details" className="pt-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Tipo de Imóvel</span>
                      <span>{property.type === 'rent' ? 'Aluguel' : 'Venda'}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Preço</span>
                      <span>{formatCurrency(property.price)}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Área</span>
                      <span>{property.area} m²</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Quartos</span>
                      <span>{property.bedrooms}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Banheiros</span>
                      <span>{property.bathrooms}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Localização</span>
                      <span>{property.location}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Publicado em</span>
                      <span>{new Date(property.createdAt).toLocaleDateString('pt-BR')}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">ID do Imóvel</span>
                      <span>BIM-{property.id}</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="location" className="pt-4">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Mapa da localização estará disponível em breve.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <p className="text-2xl font-bold text-realestate-primary mb-1">
                      {property.type === 'rent' ? `${formatCurrency(property.price)}/mês` : formatCurrency(property.price)}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {property.location}
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Vendedor</h3>
                    <p className="font-medium">{property.seller.name}</p>
                    <p className="text-sm text-gray-500">{property.seller.phone}</p>
                    <p className="text-sm text-gray-500">{property.seller.email}</p>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleContact} className="w-full bg-realestate-primary hover:bg-realestate-primary/90">
                      Entrar em contato
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Heart size={18} className="mr-2" />
                        Favorito
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 size={18} className="mr-2" />
                        Compartilhar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
