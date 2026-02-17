export interface Partner {
  id: number;
  name: string;
  username: string;
  followers: string;
  bio: string;
  avatar: string;
  instagramUrl: string;
}

export const partners: Partner[] = [
  {
    id: 1,
    name: 'Sakura Content',
    username: '@sakura_content',
    followers: '125K',
    bio: 'Japanese lifestyle & culture enthusiast sharing daily inspiration',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    instagramUrl: 'https://instagram.com/sakura_content',
  },
  {
    id: 2,
    name: 'Tokyo Vibes',
    username: '@tokyo_vibes',
    followers: '98K',
    bio: 'Content creator sharing Japanese experiences and hidden gems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    instagramUrl: 'https://instagram.com/tokyo_vibes',
  },
  {
    id: 3,
    name: 'Nihon Traditions',
    username: '@nihon_traditions',
    followers: '156K',
    bio: 'Exploring and preserving Japanese traditions for the modern world',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    instagramUrl: 'https://instagram.com/nihon_traditions',
  },
  {
    id: 4,
    name: 'Ramen & Travel',
    username: '@ramen_and_travel',
    followers: '203K',
    bio: 'Japanese food & travel blogger exploring authentic culinary experiences',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    instagramUrl: 'https://instagram.com/ramen_and_travel',
  },
  {
    id: 5,
    name: 'Anime Soul',
    username: '@anime_soul',
    followers: '187K',
    bio: 'Anime & manga passionate creator bringing stories to life',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    instagramUrl: 'https://instagram.com/anime_soul',
  },
];
