"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef } from "react";
import PhysicsLoadingGame from "@/components/physics-loading-game";
import { Heart, Star, Clock, TrendingUp } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  prepTime?: string;
  rating?: number;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  items: MenuItem[];
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPhysicsGame, setShowPhysicsGame] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      id: 0,
      name: "صبحانه",
      icon: "🌞",
      items: [
        {
          id: 1,
          name: "املت کلاسیک",
          description: "تخم مرغ، پنیر، سبزیجات تازه",
          price: 85000,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          isPopular: true,
          prepTime: "15 دقیقه",
          rating: 4.8,
        },
        {
          id: 2,
          name: "پنکیک بلوبری",
          description: "پنکیک خانگی با بلوبری تازه و شربت افرا",
          price: 95000,
          image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
          prepTime: "20 دقیقه",
          rating: 4.6,
        },
        {
          id: 3,
          name: "کورنفلکس با شیر",
          description: "کورنفلکس تازه با شیر سرد",
          price: 45000,
          image: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400&h=300&fit=crop",
          prepTime: "5 دقیقه",
          rating: 4.2,
        },
        {
          id: 4,
          name: "نان تست با کره و مربا",
          description: "نان تست برشته با کره طبیعی و مربای خانگی",
          price: 55000,
          image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
          prepTime: "10 دقیقه",
          rating: 4.4,
        },
        {
          id: 5,
          name: "ساندویچ صبحانه",
          description: "ساندویچ با تخم مرغ، پنیر و سبزیجات",
          price: 75000,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
          prepTime: "12 دقیقه",
          rating: 4.7,
        },
      ],
    },
    {
      id: 1,
      name: "نوشیدنی سرد",
      icon: "🍹",
      items: [
        {
          id: 6,
          name: "آب پرتقال طبیعی",
          description: "آب پرتقال تازه و طبیعی",
          price: 35000,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
          isPopular: true,
          prepTime: "3 دقیقه",
          rating: 4.9,
        },
        {
          id: 7,
          name: "شیک موز",
          description: "شیک موز با شیر و عسل",
          price: 45000,
          image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop",
          prepTime: "8 دقیقه",
          rating: 4.5,
        },
        {
          id: 8,
          name: "لیموناد",
          description: "لیموناد تازه با نعناع",
          price: 30000,
          image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop",
          prepTime: "5 دقیقه",
          rating: 4.3,
        },
        {
          id: 9,
          name: "آب سیب",
          description: "آب سیب طبیعی و تازه",
          price: 40000,
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
          prepTime: "4 دقیقه",
          rating: 4.4,
        },
        {
          id: 10,
          name: "شیک توت فرنگی",
          description: "شیک توت فرنگی با خامه",
          price: 50000,
          image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop",
          prepTime: "10 دقیقه",
          rating: 4.6,
        },
      ],
    },
    {
      id: 2,
      name: "نوشیدنی گرم",
      icon: "🍵",
      items: [
        {
          id: 11,
          name: "چای سیاه",
          description: "چای سیاه دمنوش شده",
          price: 25000,
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
          prepTime: "3 دقیقه",
          rating: 4.2,
        },
        {
          id: 12,
          name: "قهوه ترک",
          description: "قهوه ترک سنتی",
          price: 40000,
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
          isPopular: true,
          prepTime: "8 دقیقه",
          rating: 4.8,
        },
        {
          id: 13,
          name: "کاپوچینو",
          description: "کاپوچینو با شیر بخار دیده",
          price: 55000,
          image: "https://images.unsplash.com/photo-1572442388796-11668a64e141?w=400&h=300&fit=crop",
          prepTime: "6 دقیقه",
          rating: 4.7,
        },
        {
          id: 14,
          name: "چای سبز",
          description: "چای سبز دمنوش شده",
          price: 30000,
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
          prepTime: "4 دقیقه",
          rating: 4.3,
        },
        {
          id: 15,
          name: "لاته",
          description: "لاته با شیر و قهوه",
          price: 60000,
          image: "https://images.unsplash.com/photo-1572442388796-11668a64e141?w=400&h=300&fit=crop",
          prepTime: "7 دقیقه",
          rating: 4.6,
        },
      ],
    },
    {
      id: 3,
      name: "پیش غذا",
      icon: "🍴",
      items: [
        {
          id: 16,
          name: "سالاد سزار",
          description: "سالاد سزار با سس مخصوص",
          price: 65000,
          image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
          isVegetarian: true,
          prepTime: "12 دقیقه",
          rating: 4.5,
        },
        {
          id: 17,
          name: "سوپ قارچ",
          description: "سوپ قارچ خانگی",
          price: 45000,
          image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
          isVegetarian: true,
          prepTime: "18 دقیقه",
          rating: 4.4,
        },
        {
          id: 18,
          name: "سالاد یونانی",
          description: "سالاد یونانی با زیتون و پنیر فتا",
          price: 70000,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
          isVegetarian: true,
          isPopular: true,
          prepTime: "15 دقیقه",
          rating: 4.7,
        },
        {
          id: 19,
          name: "سوپ گوجه فرنگی",
          description: "سوپ گوجه فرنگی با نان تست",
          price: 40000,
          image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
          isVegetarian: true,
          prepTime: "20 دقیقه",
          rating: 4.3,
        },
        {
          id: 20,
          name: "سالاد کلم",
          description: "سالاد کلم با سس مایونز",
          price: 35000,
          image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
          isVegetarian: true,
          prepTime: "10 دقیقه",
          rating: 4.1,
        },
      ],
    },
    {
      id: 4,
      name: "غذای سرد",
      icon: "🍔",
      items: [
        {
          id: 21,
          name: "ساندویچ مرغ",
          description: "ساندویچ مرغ با سبزیجات",
          price: 85000,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
          isPopular: true,
          prepTime: "8 دقیقه",
          rating: 4.6,
        },
        {
          id: 22,
          name: "ساندویچ تن",
          description: "ساندویچ تن ماهی با پیاز",
          price: 75000,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
          prepTime: "6 دقیقه",
          rating: 4.4,
        },
        {
          id: 23,
          name: "سالاد الویه",
          description: "سالاد الویه با سیب زمینی",
          price: 55000,
          image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
          isVegetarian: true,
          prepTime: "12 دقیقه",
          rating: 4.3,
        },
        {
          id: 24,
          name: "ساندویچ پنیر",
          description: "ساندویچ پنیر با گوجه و خیار",
          price: 65000,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
          isVegetarian: true,
          prepTime: "5 دقیقه",
          rating: 4.2,
        },
        {
          id: 25,
          name: "سالاد مرغ",
          description: "سالاد مرغ با سبزیجات تازه",
          price: 90000,
          image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
          prepTime: "15 دقیقه",
          rating: 4.5,
        },
      ],
    },
    {
      id: 5,
      name: "غذای گرم",
      icon: "🍲",
      items: [
        {
          id: 26,
          name: "کباب کوبیده",
          description: "کباب کوبیده با برنج و سبزیجات",
          price: 180000,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          isPopular: true,
          prepTime: "25 دقیقه",
          rating: 4.9,
        },
        {
          id: 27,
          name: "قورمه سبزی",
          description: "قورمه سبزی با برنج و گوشت",
          price: 160000,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          prepTime: "30 دقیقه",
          rating: 4.7,
        },
        {
          id: 28,
          name: "خورشت قیمه",
          description: "خورشت قیمه با سیب زمینی",
          price: 150000,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          prepTime: "28 دقیقه",
          rating: 4.6,
        },
        {
          id: 29,
          name: "کباب برگ",
          description: "کباب برگ با برنج و کره",
          price: 200000,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          isSpicy: true,
          prepTime: "22 دقیقه",
          rating: 4.8,
        },
        {
          id: 30,
          name: "خورشت بادمجان",
          description: "خورشت بادمجان با برنج",
          price: 140000,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
          isVegetarian: true,
          prepTime: "35 دقیقه",
          rating: 4.5,
        },
      ],
    },
  ];

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Simple animations using CSS transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Category change handler
  const handleCategoryChange = (categoryId: number) => {
    if (isAnimating || categoryId === selectedCategory) return;
    
    setIsAnimating(true);
    setSelectedCategory(categoryId);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className={`text-center py-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            منوی رستوران ارکیده
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            تجربه‌ای منحصر به فرد از طعم‌های اصیل و مدرن
          </p>
          
          {/* Physics Game Button */}
          <button
            onClick={() => setShowPhysicsGame(true)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="text-2xl">🎮</span>
            بازی فیزیک کافه
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`
                  flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 whitespace-nowrap
                  ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                  ${selectedCategory === category.id
                    ? 'bg-white dark:bg-gray-800 text-orange-600 shadow-lg scale-105 border-2 border-orange-200'
                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md'
                  }
                `}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-semibold text-lg">{category.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedCategoryData?.items.map((item, index) => (
            <div
              key={item.id}
              className={`
                bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer
                ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
              `}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay with badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Popular Badge */}
                {item.isPopular && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    محبوب
                  </div>
                )}
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(item.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-4">
                  {item.isSpicy && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      تند 🌶️
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                      گیاهی 🌱
                    </span>
                  )}
                </div>

                {/* Info Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.prepTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {item.rating}
                    </div>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {formatPrice(item.price)} تومان
                  </span>
                  
                  <div className="flex gap-2">
                    <Button
                      className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-2 transition-all duration-300 hover:scale-105"
                      size="sm"
                    >
                      افزودن
                    </Button>
                    <Button
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl px-4 py-2 transition-all duration-300"
                      variant="ghost"
                      size="sm"
                    >
                      جزئیات
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {!selectedCategoryData && (
        <div className="text-center py-20">
          <div className="text-8xl mb-6">👀</div>
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
            دسته‌بندی انتخاب نشده
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            لطفاً یک دسته‌بندی از بالا انتخاب کنید
          </p>
        </div>
      )}

      {/* Loading overlay during animations */}
      {isAnimating && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">در حال بارگذاری...</span>
            </div>
          </div>
        </div>
      )}

      {/* Physics Game Modal */}
      {showPhysicsGame && (
        <div className="fixed inset-0 z-50">
          <PhysicsLoadingGame />
          <button
            onClick={() => setShowPhysicsGame(false)}
            className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>
      )}
    </div>
  );
}
