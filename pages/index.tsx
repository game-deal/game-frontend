import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "sonner";

interface Game {
  name: string;
  old_price: string;
  new_price: string;
  discount_percentage: string;
  expiry_date: string;
  image_url: string;
  discount_url: string;
  is_historical_low: boolean;
  description: string; // Add the description property
}

const gamesPerPage: number = 12;

const DiscountedGamesPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [carouselGames, setCarouselGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:8080/http://localhost:3001');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setGames(data);
        setFilteredGames(data.slice(0, gamesPerPage));
        setCarouselGames(data.slice(0, 4));
      } catch (error) {
        toast.error(`Error fetching data`);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);
    setFilteredGames(currentGames);
  }, [currentPage, games]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredGames(games.slice(0, gamesPerPage));
      return;
    }
    const filtered = games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredGames(filtered.slice(0, gamesPerPage));
  }, [searchTerm, games]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const totalDiscountedGames = games.length;

  // @ts-ignore
  return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Game Discounts</h1>
          <p className="text-gray-500 mt-2 mb-8">Get your favorite games at unbeatable prices!</p>
        </div>

        <section>
          <Carousel>
            <CarouselContent>
              {carouselGames.map((game, index) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <Image
                          className="aspect-[2/1] rounded"
                          src={game.image_url}
                          alt={game.name}
                          width={1400}
                          height={600}
                          quality={100}
                          loading="lazy" // Lazy loading
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                        <h2 className="text-xl font-bold">{game.name}</h2>
                        <p className="text-sm">{game.description}</p>
                        <div className="flex justify-between">
                          <span className="text-lg">{game.new_price}</span>
                          <span className="text-lg line-through text-white">{game.old_price}</span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>
        </section>

        <div className="my-8">
          <Input
              type="text"
              placeholder="Search games"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid gap-6 sm:gap-4 lg:gap-2 xl:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGames.map((game, index) => (
              <Link href={game.discount_url} key={index} legacyBehavior>
                <a>
                  <motion.div
                      whileHover={{scale: 1.05}}
                      whileTap={{scale: 0.95}}
                      className="relative overflow-hidden"
                      style={{height: '100%'}}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{game.name}</CardTitle>
                      </CardHeader>
                      <Image
                          src={game.image_url}
                          alt={game.name}
                          quality={100}
                          width={100}
                          height={100}
                          className="absolute top-0 left-0 w-full h-full object-cover rounded"
                          loading="lazy" // Lazy loading
                      />
                      <CardContent className="relative z-10">
                        <div className="flex items-baseline gap-2 text-2xl font-semibold">
                          <span>{game.new_price}</span>
                          <span className="line-through text-white">{game.old_price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </a>
              </Link>
          ))}
        </div>

        <div className="flex justify-center my-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage === 1 ? (
                    <PaginationPrevious onClick={() => {}} />
                ) : (
                    <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                )}
              </PaginationItem>
              {[...Array(Math.ceil(games.length / gamesPerPage)).keys()].map((number) => (
                  <PaginationItem key={number}>
                    <PaginationLink onClick={() => paginate(number + 1)}>{number + 1}</PaginationLink>
                  </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationPrevious
                    onClick={() => paginate(currentPage - 1)}
                    className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        </div>

        <div className="flex justify-center items-center content-center my-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Discounted Games</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="justify-center items-center">{totalDiscountedGames}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default DiscountedGamesPage;
