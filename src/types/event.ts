export interface Event {
  id: string;
  title: string;
  type: 'concert' | 'match';
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  price: number;
  currency: string;
  artist?: string;
  homeTeam?: string;
  awayTeam?: string;
  category: string;
  availableSeats: number;
  isLive?: boolean;
  isSoldOut?: boolean;
}

export interface TicketCategory {
  id: string;
  name: string;
  price: number;
  available: number;
}
